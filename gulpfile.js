// Requiring packages
var gulp = require('gulp');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var ngAnnotate = require('gulp-ng-annotate');
var wiredep = require('wiredep').stream;

// Gulp task that starts and runs server
gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['ng*', 'public*']
  });
});

// Gulp task that includes all libraries downloaded from bower into index.html
gulp.task('bower', function () {
  gulp.src('./public/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./public'));
});

// Gulp task that updates main.js everytime theres a file change in the ng folder
gulp.task('js:build', function() {
  return gulp.src([
    './ng/**/module.js',
    './ng/**/*.js'
  ])
  .pipe(ngAnnotate())
  .pipe(concat('./main.js'))
  .pipe(gulp.dest('./public/assets/js/'));
});

// Gulp task that watches for any updates inside the ng folder, if there is then run the js:build gulp task
gulp.task('js:watch', ['js:build'], function () {
  gulp.watch('./ng/**/*.js', ['js:build'])
});

// When you run gulp in terminal it runs all gulp tasks
gulp.task('default', ['js:watch', 'bower','server']);
