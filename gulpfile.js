var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task("default", function () {
    return gulp.src(["./index.js"])
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(concat("bundle.js"))
        .pipe(gulp.dest("./"))
        .pipe(rename('bundle.min.js'))
        .pipe(babel())
        .pipe(uglify({
            compress: true
        })
        .on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest("./"))
});