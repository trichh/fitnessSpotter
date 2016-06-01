var gulp = require('gulp');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var ngAnnotate = require('gulp-ng-annotate');
var wiredep = require('wiredep').stream;

gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['ng*', 'public*']
  });
});

gulp.task('bower', function () {
  gulp.src('./public/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./public'));
});

gulp.task('js:build', function() {
  return gulp.src([
    './ng/**/module.js',
    './ng/**/*.js'
  ])
  .pipe(ngAnnotate())
  .pipe(concat('./main.js'))
  .pipe(gulp.dest('./public/assets/js/'));
});

gulp.task('js:watch', ['js:build'], function () {
  gulp.watch('./ng/**/*.js', ['js:build'])
});

gulp.task('default', ['js:watch', 'bower','server']);
