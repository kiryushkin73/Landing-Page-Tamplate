const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const browserTask = () =>
  browserSync.init({
    server: {
      baseDir: './src',
    },
  });

const watcher = () => {
  watch('./src/scss/**/*.scss', sassTask);
  watch('./src/*.html').on('change', browserSync.reload);
};

const sassTask = () =>
  src('./src/scss/style.scss')
    .pipe(sass())
    .pipe(dest('./src/css'))
    .pipe(browserSync.stream());

exports.default = series(sassTask, parallel(browserTask, watcher));
