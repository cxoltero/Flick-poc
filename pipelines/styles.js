'use strict';
var gulp = require('gulp');
var validateCssPipeline = require('pipeline-validate-css')();
var concatcss = require('gulp-concat-css');
var cssnano = require('gulp-cssnano');
var mainBowerFiles = require('main-bower-files');
var clear = require('./clear.js');

gulp.task('css:lint',['clean:dest'], function() {
  return gulp
    .src('./src/css/**/*.css')
    .pipe(validateCssPipeline.validateCSS());
});

gulp.task('css:concat',['clean:dest'], function() {
  var filter = mainBowerFiles('**/*.css');
  filter.push('./src/**/*.css');
  return gulp
    .src(filter)
    .pipe(concatcss('css/styles.css'))
    .pipe(gulp.dest('./dest/'));
});

gulp.task('css:minify', ['css:concat'] , function() {
  return gulp.src('./dest/css/styles.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./dest/css'));
});

gulp.task('applyCSS', ['css:lint', 'css:minify']);