// gulpプラグインの読み込み
const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require('gulp-changed');

// パス
const paths = {
  src: "./resources/**/",
  dest: "./",
};

// ejs
const htmlCompile = () => {
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
const cssMinify = () => {
  return gulp
    .src(`${paths.src}/*.css`)
    // .pipe(sourcemaps.init())
    // .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest));
}

// video
const duplicateVideo = () => {
  return gulp
    .src(`${paths.src}/video/**`)
    .pipe(gulp.dest(paths.dest));
}

// js圧縮
const jsMinify = () => {
  return gulp
    .src(`${paths.src}/*.js`)
    // .pipe(sourcemaps.init())
    // minifyの処理
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest));
}

// image-min
const imgMinify = () => {
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
const startAppServer = () => {
  browserSync.init({
    server: {
        baseDir: "../",
        directory: true,
    },
    port: 3035,
    // 検証ブラウザを指定する場合は下記のように追記
    // browser: ["google chrome", "firefox"]
  });

  gulp.watch("./resources/**/*.ejs", htmlCompile);
  // gulp.watch("./resources/**/img/*", imgMinify);
  gulp.watch("./resources/**/*.css", cssMinify);
  gulp.watch("./resources/**/*.js", jsMinify);
  // gulp.watch("./resources/**/video/*", duplicateVideo);

  gulp.watch("./resources/**/*").on("change", browserSync.reload);
}

exports.start = () => {
  // gulp.watch("./resources/**/img/*", imgMinify);
  gulp.watch("./resources/**/*.css", cssMinify);
  gulp.watch("./resources/**/*.js", jsMinify);
  gulp.watch("./resources/**/*.ejs", htmlCompile);
  // gulp.watch("./resources/**/video/*", duplicateVideo);

};

exports.serve = () => {
  startAppServer();
};
