'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var path = require('path');
var _ = require('lodash');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');

var themesConfig = require('../themes.config');
var themeDirectoryNames = themesConfig.themeDirectoryNames;

var buildTaskNames = [];

themeDirectoryNames.forEach(function (theme) {
    var sassTaskName = 'sass:' + theme;
    var bootstrapFontTaskName = 'bootstrap-fonts:' + theme;
    var themeFontTaskName = 'fonts:' + theme;

    gulp.task(sassTaskName, function () {
        return gulp.src(themesConfig.getThemeSrcFile(theme))
            .pipe(rename('style.css'))
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 3 versions'],
                cascade: false
            }))
            .pipe(gulp.dest(themesConfig.getThemeDestPath(theme)))
            .pipe(livereload());
    });

    gulp.task(bootstrapFontTaskName, function () {
        return gulp.src(themesConfig.getBootstrapFontFiles())
            .pipe(gulp.dest(themesConfig.getThemeFontDest(theme)))
            .pipe(livereload());
    });

    gulp.task(themeFontTaskName, function () {
        return gulp.src(themesConfig.getThemeFontFiles(theme))
            .pipe(gulp.dest(themesConfig.getThemeFontDest(theme)))
            .pipe(livereload());
    });

    buildTaskNames.push([sassTaskName, bootstrapFontTaskName, themeFontTaskName]);
});

gulp.task('sass-fonts', _.flatten(buildTaskNames));

