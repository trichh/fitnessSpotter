// Requiring packages
var gulp = require('gulp');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var ngAnnotate = require('gulp-ng-annotate');
var wiredep = require('wiredep').stream;
var uglify = require('gulp-uglify');

// Gulp task that starts and runs server
gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['frontendFramework*', 'public*']
  });
});

// Gulp task that includes all libraries downloaded from bower into index.html
gulp.task('bower', function () {
  gulp.src('./public/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./public'));
});

// Gulp task that updates main.js everytime theres a file change in the frontendFramework folder
gulp.task('js:build', function() {
  return gulp.src([
    './frontendFramework/**/module.js',
    './frontendFramework/**/*.js'
  ])
  .pipe(ngAnnotate())
  .pipe(concat('./main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./public/assets/js/'));
});

// Gulp task that watches for any updates inside the frontendFramework folder, if there is then run the js:build gulp task
gulp.task('js:watch', ['js:build'], function () {
  gulp.watch('./frontendFramework/**/*.js', ['js:build'])
});

// When you run gulp in terminal it runs all gulp tasks
gulp.task('default', ['js:watch', 'bower','server']);
