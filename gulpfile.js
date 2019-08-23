const { watch, series, src, dest, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

function html(cb) {
  src('pug/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('dist'));
  cb();
}

function css(cb) {
  src('scss/base.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(dest('./dist'))
  cb();
}

function monitor(cb) {
  watch('pug/**/*.pug', html);
  watch('scss/**/*.scss', css);
  cb();
}

exports.default = series(parallel(html, css), monitor);
