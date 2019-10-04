const {series, watch, parallel, src, dest} = require('gulp');

const browsersync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyJS = require('gulp-uglify');
const minifyImg = require('gulp-imagemin');
const minifyHTML = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const del = require('del');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: 'dist'
    }
  });
};

function css() {
  return src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(concat('app.min.css'))
    .pipe(dest('dist/css'))
    .pipe(browsersync.stream());
}

function js() {
  return src('src/js/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(minifyJS())
    .pipe(dest('dist/js'))
    .pipe(browsersync.stream());
}

function html() {
  return src('src/**/*.html')
    .pipe(minifyHTML({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest('dist'))
    .pipe(browsersync.stream());
}

function img() {
  return src('src/img/**/*')
    .pipe(minifyImg())
    .pipe(dest('dist/img'));
}

function clean() {
  return del(['dist/css', 'dist/js', 'dist/img', 'dist/**/*.html']);
};

function dev() {
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js', js);
  watch('src/img/**/*', img);
  watch('src/**/*.html', html);
};

function deploy() {
  return src('dist/**/*')
    .pipe(ghPages());
};

const build = series(clean, img, css, js, html, browserSync);
const development = series(img, css, js, html, parallel(dev, browserSync));
const deployTask = series(clean, img, css, js, html, parallel(deploy));

exports.css = css;
exports.js = js;
exports.html = html;
exports.img = img;
exports.clean = clean;
exports.browserSync = browserSync;
exports.development = development;
exports.deploy = deployTask;
exports.default = build;