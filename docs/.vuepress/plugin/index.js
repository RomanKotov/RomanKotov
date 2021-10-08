const utils = require("@vuepress/utils");

const pagesToExclude = new Set([
  "/",
  "/404.html"
]);

const compareString = (a, b) => a.localeCompare(b)

const sortedLinks = (array) => [...array].sort(
  (a, b) => {
    if (a.date === b.date) {
      return compareString(a.path, b.path);
    }

    return -compareString(a.date, b.date);
  }
)

module.exports = {
  name: "plugin",
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
