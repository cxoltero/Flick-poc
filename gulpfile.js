'use strict';
var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js')();
var validateCssPipeline = require('pipeline-validate-css')();

gulp.task('js:lint', function() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(validatePipeline.validateJS());
});

gulp.task('css:lint', function() {
  return gulp
      .src('./src/css/**/*.js')
      .pipe(validateCssPipeline.validateCSS());
});

gulp.task('default', ['js:lint', 'css:lint']);