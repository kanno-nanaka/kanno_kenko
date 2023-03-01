// gulpプラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

const styles = () => {
  // style.scssファイルを取得
  return gulp
    .src("./assets/scss/*.scss")
    // Sassのコンパイルを実行
    .pipe(sass({outputStyle: 'compressed'}))
    // cssフォルダー以下に保存
    .pipe(gulp.dest("./assets/css"))
}

// browsersync
const startAppServer = () => {
  browserSync.init({
    server: {
        baseDir: "../",
        directory: true,
    },
    port: 3034,
    // 検証ブラウザを指定する場合は下記のように追記
    // browser: ["google chrome", "firefox"]
  });
  gulp.watch("./assets/scss/*.scss", styles);

  gulp.watch("./assets/**/*").on("change", browserSync.reload);
}

exports.start = () => {
  gulp.watch("./assets/scss/*.scss", styles);
}

exports.serve = () => {
  startAppServer();
}
