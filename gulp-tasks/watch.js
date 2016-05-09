var gulp = require('gulp');
var themesConfig = require('../themes.config');

gulp.task('watch', function () {
    return gulp.watch(themesConfig.getThemeSassWatch(), ['build']);
});
