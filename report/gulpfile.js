// gulpプラグインの読み込み
const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require('gulp-changed');

// パス
const paths = {
  src: "./src/**/",
  dest: "./dist",
};

// ejs
function htmlCompile() {
  return gulp
    .src([`${paths.src}/*.ejs`, `!${paths.src}_*.ejs`, `!${paths.src}_*/*.ejs`])
    .pipe(ejs())
    .pipe(
      rename(function (path) {
        path.extname = ".html";
      })
    )
    .pipe(gulp.dest(paths.dest));
}

// css圧縮
function cssMinify() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(sourcemaps.init())
    // .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${paths.dest}/css`));
}

// js圧縮
function jsMinify() {
  return gulp
    .src(`${paths.src}/*.js`)
    // .pipe(sourcemaps.init())
    // minifyの処理
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest));
}

// image-min
function imgMinify() {
  return gulp
    .src(`${paths.src}/img/**`)
    .pipe(changed(paths.dest))
    .pipe(
      imagemin([
        pngquant({
          quality: [0.65, 0.8],
          speed: 1,
        }),
        mozjpeg({
          quality: 80,
        }),
        imagemin.gifsicle({
          interlaced: false,
        }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest(paths.dest));
}

// browsersync
function startAppServer() {
  browserSync.init({
    server: {
        baseDir: "./dist/",
        directory: true,
    },
    // 検証ブラウザを指定する場合は下記のように追記
    // browser: ["google chrome", "firefox"]
  });

  gulp.watch("./src/**/*.ejs", htmlCompile);
  gulp.watch("./src/**/img/*", imgMinify);
  gulp.watch("./src/scss/**/*.scss", cssMinify);
  gulp.watch("./src/**/*.js", jsMinify);

  gulp.watch("./src/**/*").on("change", browserSync.reload);
}

exports.start = function () {
  gulp.watch("./src/**/img/*", imgMinify);
  gulp.watch("./src/scss/**/*.scss", cssMinify);
  gulp.watch("./src/**/*.js", jsMinify);
  gulp.watch("./src/**/*.ejs", htmlCompile);
};

exports.serve = function () {
  startAppServer();
};
