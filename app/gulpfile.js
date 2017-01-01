const exec = require('child_process').exec;
const gulp = require('gulp');

gulp.task('server', function() {
    exec('npm start');
});

gulp.task('wp:dev', function() {
    exec('npm run wp:dev');
});

gulp.task('dev', ['wp:dev', 'server']);
