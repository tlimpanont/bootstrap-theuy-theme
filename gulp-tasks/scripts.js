'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var path = require('path');
var _ = require('lodash');
var livereload = require('gulp-livereload');

var themesConfig = require('../themes.config');
var themeDirectoryNames = themesConfig.themeDirectoryNames;

var buildTaskNames = [];

themeDirectoryNames.forEach(function (theme) {
    var jsTaskName = 'js:' + theme;

    gulp.task(jsTaskName, function () {
        gulp.src(themesConfig.getBootstrapJSFile())
            .pipe(gulp.dest(themesConfig.getThemeScriptsDestPath(theme)))
    });

    buildTaskNames.push(jsTaskName);
});

gulp.task('scripts', _.flatten(buildTaskNames));

