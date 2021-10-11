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
