const render = require('posthtml-render');
const parser = require('posthtml-parser');
const nunjucks = require('nunjucks');
const { getPosthtmlW3c } = require('pineglade-w3c');

const isDev = process.env.NODE_ENV === 'development';

const getPageName = (tree) => tree.options.from
  .replace(/^.*pages(\\+|\/+)(.*)\.njk$/, '$2')
  .replace(/\\/g, '/');

module.exports = () => ({
  plugins: [
    (() => async (tree) => {
      // Сборка шаблонизатором Nunjucks

      const page = getPageName(tree);
      let data = {
        isDev,
        page
      };

      nunjucks.configure('source/njk', { autoescape: false });

      return parser(nunjucks.renderString(render(tree), data));
    })(),
    require('htmlnano')({ collapseWhitespace: 'aggressive' }),
    getPosthtmlW3c({
      getSourceName: (tree) => `${getPageName(tree)}.html`
    })
  ]
});
