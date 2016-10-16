var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('autofx', function () {
  gulp.src('views/fsm.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 3.0'],
        cascade: true,
        remove: true,
      }))
      .pipe(gulp.dest('views/'));
})
