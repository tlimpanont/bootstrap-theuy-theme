var gulp = require('gulp');
var runSequence = require('gulp-run-sequence');

gulp.task('build', function(cb) {
    return runSequence('clean-dist', 'sass-fonts', cb);
});
