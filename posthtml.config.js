const render = require('posthtml-render');
const parser = require('posthtml-parser');
const nunjucks = require('nunjucks');
const { getPosthtmlW3c } = require('pineglade-w3c');

const IS_DEV = process.env.NODE_ENV === 'development';

const getPageName = (filename) => filename
  .replace(/^.*pages(\\+|\/+)(.*)\.njk$/, '$2')
  .replace(/\\/g, '/');

const plugins = [
  (() => async (tree) => {
    // Сборка шаблонизатором Nunjucks
    nunjucks.configure('source/njk', { autoescape: false });

    return parser(nunjucks.renderString(render(tree), {
      IS_DEV,
      page: getPageName(tree.options.from),
      ver: IS_DEV ? `?${Date.now()}` : null
    }));
  })(),
  getPosthtmlW3c({
    exit: !IS_DEV,
    forceOffline: true,
    getSourceName: (filename) => `${getPageName(filename)}.html`
  })
];
if (!IS_DEV) {
  plugins.push(require('htmlnano')({
    collapseWhitespace: 'aggressive',
    minifySvg: false
  }));
}

module.exports = () => ({
  plugins
});
