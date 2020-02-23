var gulp = require("gulp"),
  concat = require("gulp-concat"),
  babel = require("gulp-babel"),
  sass = require("gulp-sass"),
  cleanCSS = require('gulp-clean-css');

function swallowError(error) {
  console.log(error.toString());
  this.emit("end");
}

gulp.task("default", function () {
  gulp.start("sass", "vendor", "js", "watch");
});

gulp.task("vendor", function () {
  gulp
    .src([])
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("./"));
});

gulp.task("js", function () {
  gulp
    .src("./js/*.js")
    .pipe(babel())
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("./"));
});

gulp.task("sass", function () {
  gulp
    .src(["./sass/style.scss"])
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .on("error", swallowError)
    .pipe(concat("style.css"))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest("./"));
});

gulp.task("watch", function () {
  gulp.watch(["./sass/**/*.scss", "./sass/*.scss"], ["sass"]);
  gulp.watch(["./js/*.js"], ["js"]);
});
