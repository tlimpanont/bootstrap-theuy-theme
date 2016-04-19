'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var gulpCopy = require('gulp-copy');
var runSequence = require('gulp-run-sequence');
var path = require('path');

gulp.task('clean:dist', function () {
  return gulp.src(path.resolve(__dirname, 'dist'))
  	.pipe(clean().on('error', gutil.log));
});

gulp.task('sass:bootstrap-theuy', function () {
  return gulp.src(path.resolve(__dirname, 'stylesheets/bootstrap-theuy.scss'))
  	.pipe(rename('bootstrap-theuy.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.resolve(__dirname, 'dist/css')));
});

gulp.task('copy:fonts', function () {
  return gulp.src(
    [path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/fonts/**/*')]
  )
  	.pipe(gulp.dest(path.resolve(__dirname, 'dist/fonts/')));
});

gulp.task('build', function(cb) {
    runSequence('clean:dist', ['sass:bootstrap-theuy', 'copy:fonts'], cb)
});
