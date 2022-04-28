import autoprefixer from 'autoprefixer';
import bemValidator from 'gulp-html-bem-validator';
import browser from 'browser-sync';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import less from 'gulp-less';
import lessSyntax from 'postcss-less';
import lintspaces from 'gulp-lintspaces';
import postcss from 'gulp-postcss';
import postcssBemLinter from 'postcss-bem-linter';
import postcssReporter from 'postcss-reporter';
import posthtml from 'gulp-posthtml';
import rename from 'gulp-rename';
import stylelint from 'stylelint';

const IS_DEV = process.env.NODE_ENV === 'development';
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

export const testHTML = () => src('source/njk/pages/**/*.njk')
  .pipe(posthtml())
  .pipe(bemValidator())
  .pipe(rename({ extname: '.html' }));

export const buildHTML = () => testHTML()
  .pipe(dest('source'));

export const testEditorconfig = () => src(editorconfigSources)
  .pipe(checkLintspaces())
  .pipe(lintspaces.reporter());

export const styles = () => src('source/less/*.less', { sourcemaps: IS_DEV })
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

export const test = parallel(testHTML, testEditorconfig, testStyles, testScripts);
export const build = parallel(buildHTML, styles);
export default series(test, build, server, watcher);
