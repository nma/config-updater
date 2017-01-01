const gulp = require('gulp');
var run = require('gulp-run');

gulp.task('server', function() {
    //run('npm start').pipe(gulp.dest('output'));
    run('npm start').exec();
});

gulp.task('wp:dev', function() {
    //run('npm run wp:dev').pipe(gulp.dest('output'));
    run('npm run wp:dev').exec();
});

gulp.task('dev', ['wp:dev', 'server']);
