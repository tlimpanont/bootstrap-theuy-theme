'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var runSequence = require('gulp-run-sequence');
var path = require('path');
var _ = require('lodash');
var themesConfig = require('./themes.config.json');

var themeDirectories = themesConfig.themeDirectories;

var buildTaskNames = [];

themeDirectories.forEach(function (theme) {
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

gulp.task('build', function(cb) {
    runSequence('clean:dist', _.flatten(buildTaskNames), cb);
});
