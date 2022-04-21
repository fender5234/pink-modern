import bemValidator from 'gulp-html-bem-validator';
import browser from 'browser-sync';
import gulp from 'gulp';
import lintspaces from 'gulp-lintspaces';
import eslint from 'gulp-eslint';
import posthtml from 'gulp-posthtml';
import rename from 'gulp-rename';
import less from 'gulp-less';
import lessSyntax from 'postcss-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import stylelint from 'stylelint';
import postcssBemLinter from 'postcss-bem-linter';
import postcssReporter from 'postcss-reporter';

const { src, dest, watch, series, parallel } = gulp;
const checkLintspaces = () => lintspaces({
  editorconfig: '.editorconfig'
});
const editorconfigSources = [
  'source/njk/**/*.njk',
  '*.json',
  'source/img/**/*.svg'
];
const jsSources = [
  'source/js/**/*.js',
  '*.js'
];

export const buildHTML = () => src('source/njk/pages/**/*.njk')
  .pipe(posthtml())
  .pipe(bemValidator())
  .pipe(rename({ extname: '.html' }))
  .pipe(dest('source'));

export const testEditorconfig = () => src(editorconfigSources)
  .pipe(checkLintspaces())
  .pipe(lintspaces.reporter());

export const styles = () => src('source/less/*.less', { sourcemaps: true })
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(dest('source/css', { sourcemaps: '.' }));

export const testStyles = () => src('source/less/**/*.less')
  .pipe(checkLintspaces())
  .pipe(lintspaces.reporter())
  .pipe(postcss([
    stylelint(),
    postcssBemLinter(),
    postcssReporter({
      clearAllMessages: true,
      throwError: false
    })
  ], {
    syntax: lessSyntax
  }));

export const testScripts = () => src(jsSources)
  .pipe(eslint({
    fix: false
  }))
  .pipe(eslint.format())
  .pipe(checkLintspaces())
  .pipe(lintspaces.reporter());

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

const reload = (done) => {
  browser.reload();
  done();
};

const watcher = () => {
  watch(editorconfigSources, series(testEditorconfig, buildHTML, reload));
  watch('source/less/**/*.less', series(testStyles, styles, reload));
  watch(jsSources, series(testScripts, reload));
};

export const build = parallel(buildHTML, styles);
export const test = parallel(testEditorconfig, testStyles, testScripts);

export default series(test, build, server, watcher);
