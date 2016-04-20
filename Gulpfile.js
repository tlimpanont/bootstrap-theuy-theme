'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var runSequence = require('gulp-run-sequence');
var path = require('path');
var _ = require('lodash');

var themes = ['flatly', 'darkly'];
var buildTaskNames = [];

themes.forEach(function (theme) {
    var sassTaskName = 'sass:' + theme;
    var fontTaskName = 'fonts:' + theme;


    gulp.task(sassTaskName, function () {
        return gulp.src(path.resolve(__dirname, 'themes/_' + theme + '.scss'))
            .pipe(rename('style.css'))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(path.resolve(__dirname, 'dist/' + theme + '/')));
    });

    gulp.task(fontTaskName, function () {
        return gulp.src(path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/fonts/**/*'))
            .pipe(gulp.dest(path.resolve(__dirname, 'dist/' + theme + '/fonts/')));
    });

    buildTaskNames.push([sassTaskName, fontTaskName]);
});


gulp.task('clean:dist', function () {
    return gulp.src(path.resolve(__dirname, 'dist'))
        .pipe(clean().on('error', gutil.log));
});

gulp.task('sass:default', function () {
    return gulp.src(path.resolve(__dirname, 'themes/_default.scss'))
        .pipe(rename('default.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.resolve(__dirname, 'dist/')));
});


gulp.task('fonts:default', function () {
    return gulp.src(path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/fonts/**/*'))
        .pipe(gulp.dest(path.resolve(__dirname, 'dist/fonts/')));
});

gulp.task('build', function(cb) {
    runSequence('clean:dist', 'sass:default', 'fonts:default', _.flatten(buildTaskNames), cb);
});
