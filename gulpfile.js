var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['sass'], function(){

  gulp.watch('./sass/**/*.scss', ['sass']);
    
  gulp.src('.').pipe(
    server({
      livereload: true,
      open: true
    }));
});
