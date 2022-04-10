import bemValidator from 'gulp-html-bem-validator';
import browsersync from 'browser-sync';
import del from 'del';
import gulp from 'gulp';
import lintspaces from 'gulp-lintspaces';
import posthtml from 'gulp-posthtml';
import rename from 'gulp-rename';

const { src, dest, watch, series } = gulp;
const server = browsersync.create();
const checkLintspaces = () => lintspaces({
  editorconfig: '.editorconfig'
});

const buildHTML = () => src('source/njk/pages/**/*.njk')
  .pipe(posthtml())
  .pipe(bemValidator())
  .pipe(rename({ extname: '.html' }))
  .pipe(dest('source'));

const testHTML = () => src('source/njk/**/*.njk')
  .pipe(checkLintspaces())
  .pipe(lintspaces.reporter());

const reload = (done) => {
  server.reload();
  done();
};

const startServer = () => {
  server.init({
    cors: true,
    open: true,
    server: 'source',
    ui: false,
    port: 2000
  });

  watch('source/njk/**/*.njk', series(testHTML, buildHTML, reload));
};

const cleanDest = () => del([
  `source/**/*.html`
]);

export const build = buildHTML;
export default series(cleanDest, testHTML, buildHTML, startServer);
