var gulp = require('gulp');
var themesConfig = require('../themes.config');
var livereload = require('gulp-livereload');


gulp.task('watch', function () {
    return gulp.watch(themesConfig.getThemeSassWatch(), ['build']);
});
