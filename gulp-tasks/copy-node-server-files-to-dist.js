var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var themesConfig = require('../themes.config');

gulp.task('copy-node-server-files-to-dist', function () {
    var serverJS = './server.js';
    var themesConfigJS = './themes.config.js';
    var _routes ='./routes/**/*.*';
    var packageJSON = './package.json';

    return gulp.src([serverJS, themesConfigJS, _routes, packageJSON] , { base: path.resolve(__dirname, '../') })
        .pipe(gulp.dest(themesConfig.getDistFolderSrc()));
});