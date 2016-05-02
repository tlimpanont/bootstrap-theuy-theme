var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var themesConfig = require('../themes.config');

gulp.task('clean-dist', function () {
    return gulp.src(themesConfig.getDistFolderSrc())
        .pipe(clean().on('error', gutil.log));
});