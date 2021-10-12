const utils = require("@vuepress/utils");

const pagesToExclude = new Set([
  "/",
  "/404.html"
]);

const SLUG_REGEXES = [
  ".*\/\\d{4}-\\d{2}-\\d{2}-(?<date>[-\\w]\+).md$",
  ".*\/(?<group>[-\\w]\+)\/index.md$",
  ".*\/(?<filename>[-\\w]\+).md$",
]

const PAGE_SLUG_REGEX = new RegExp(`${SLUG_REGEXES.join("|")}`);

const compareString = (a, b) => a.localeCompare(b)

const sortedLinks = (array) => [...array].sort(
  (a, b) => {
    if (a.date === b.date) {
      return compareString(a.path, b.path);
    }

    return -compareString(a.date, b.date);
  }
)

const extractPageSlug = (name) => {
  const groups = PAGE_SLUG_REGEX.exec(name)?.groups || {};
  return groups['date'] || groups['group'] || groups['filename'];
}

const siteUrl = (path) => utils.path.join("https://romankotov.com", path)

const extendPageHead = (page, app) => {
  const pageData = {
    author: "Roman Kotov",
    title: page.title || app.options.title,
    description: page.description || app.options.description,
    type: "article",
    url: siteUrl(page.path),
    image: siteUrl("/assets/favicon_io/android-chrome-512x512.png"),
  };

  const ogData = (property, key) => [
    "meta",
    {
      property,
      prefix: "og: http://ogp.me/ns#",
      content: pageData[key],
    },
  ];

  return [
    ogData("og:title", "title"),
    ogData("twitter:title", "title"),
    ogData("og:type", "type"),
    ogData("og:url", "url"),
    ogData("og:description", "description"),
    ogData("og:image", "image"),
    ogData("og:article:author", "author"),
    [
      "script",
      {
        type: "application/ld+json",
      },
      JSON.stringify({
        "author": {
          "@type": "Person",
          "name": pageData["author"],
        },
        "description": pageData["description"],
        "headline": pageData["title"],
        "url": pageData["url"],
        "@type": pageData["type"],
        "@context": "https://schema.org"
      })
    ],
  ];
}

module.exports = {
  name: "plugin",
  extendsPageOptions: ({ filePath }, app) => {
    if (!filePath) {
      return {};
    }

    const localPath = filePath.replace(app.dir.source(), "");

    const pageSlug = extractPageSlug(localPath);

    const commentsFolder = utils.path.join(
      app.dir.source(),
      "..",
      "_data",
      "comments",
      pageSlug,
    )

    let comments = [];

    const pageHasComments = (
      utils.fs.existsSync(commentsFolder) &&
        utils.fs.lstatSync(commentsFolder).isDirectory()
    );
    if (pageHasComments) {
      comments = utils.fs.readdirSync(commentsFolder).filter(
        (filename) => filename.endsWith(".json")
      ).map(
        (filename) => utils.path.join(commentsFolder, filename)
      ).map(
        (path) => utils.fs.readJSONSync(path)
      );
    }

    return {
      frontmatter: {
        pageSlug,
        comments,
      }
    }
  },
  extendsPageData: (page, app) => {
    const head = extendPageHead(page, app);
    return {
      frontmatter: {
        ...page.frontmatter,
        head: [
          ...(page.frontmatter.head || []),
          ...head,
        ],
      }
    };
  },
  onInitialized: (app) => {
    const navbarLinks = (
      app.pages
        .filter(
          ({ path }) => !pagesToExclude.has(path)
        )
        .map(
          ({ path, title, date }) => ({
            date,
            path,
            title,
            parent: utils.path.join(
              utils.path.dirname(path),
              '/'
            ),
          })
        )
        .reduce((acc, current) => {
          const { parent } = current;
          return {
            ...acc,
            [parent]: [
              ...(acc[parent] || []),
              current,
            ]
          }
        }, {})
    );

    const toNavbarData = (data) => {
      const { title, path } = data;
      const childrenLinks = navbarLinks[path] || [];

      const result = {
        text: title,
        link: path,
      };

      if (childrenLinks.length === 0) {
        return result;
      }

      return {
        ...result,
        children: sortedLinks(childrenLinks).map(({ path }) => path),
      }
    }

    app.options.themeConfig.navbar.push(
      ...sortedLinks(navbarLinks['/']).map(toNavbarData),
    );
  },
}
