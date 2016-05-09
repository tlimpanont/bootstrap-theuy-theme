var gulp = require('gulp');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var path = require('path');
var runSequence = require('gulp-run-sequence');

gulp.task('dev-server', function (cb) {
    runSequence('nodemon', 'build-watch', cb);
});

gulp.task('nodemon', function () {
    livereload.listen();

    nodemon({
        script: path.resolve(__dirname, '../server.js'),
        ext: 'js html'
    })
    .on('restart', function () {
        setTimeout(function() {
            console.log('nodemon restart server');
            livereload.reload();
        }, 1000);
    })
});
