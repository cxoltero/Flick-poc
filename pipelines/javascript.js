'use strict';
var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js')();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');
var clear = require('./clear.js');

gulp.task('js:lint',['clean:dest'], function() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(validatePipeline.validateJS());
});

gulp.task('js:concat:bower',['clean:dest'], function () {
  var filter = mainBowerFiles('**/*.js');

  return gulp
    .src(filter)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./dest/js/'));
});

gulp.task('js:concatApp',['clean:dest'], function() {
  return gulp
    .src(['!./src/js/**/*.test.js', './src/js/**/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./dest/js/'));
});

gulp.task('js:uglify', ['js:concatApp', 'js:concat:bower'], function(){
  return gulp.src('./dest/js/**/*.js')
    .pipe(uglify().on('error', function(e) {
      console.log(e);
    }))
    .pipe(gulp.dest('./dest/js'));
});

gulp.task('applyJS', ['js:lint', 'js:uglify']);