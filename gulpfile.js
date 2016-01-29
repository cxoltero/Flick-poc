'use strict';
var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js')();
var validateCssPipeline = require('pipeline-validate-css')();
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var mainBowerFiles = require('main-bower-files');
var htmlreplace = require('gulp-html-replace');

//check for css and js errors
gulp.task('js:lint', function() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(validatePipeline.validateJS());
});
gulp.task('css:lint', function() {
  return gulp
    .src('./src/css/**/*.css')
    .pipe(validateCssPipeline.validateCSS());
});

//concatenate files for venders and app
gulp.task('js:concatBower', function () {
  var filter = mainBowerFiles('**/*.js');

  return gulp
    .src(filter)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./dest/js/'));
});
gulp.task('js:concatApp', function() {
  return gulp
    .src(['!./src/js/**/*.test.js', './src/js/**/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./dest/js/'));
});

//collect required assets
gulp.task('getAssets', function () {
  var assets = mainBowerFiles(['**/*.png', '**/*.gif']);

  return gulp
    .src(assets)
    .pipe(gulp.dest('./dest/lightbox2/src/images/'));
});
gulp.task('replaceHTML', function() {
  return gulp.src('./src/index.html')
    .pipe(htmlreplace({
      'css': './css/styles.css',
      'js': ['js/vendor.min.js', 'js/app.min.js']
    }))
    .pipe(gulp.dest('dest/'));
});

//concatenate stylesheets
gulp.task('css:concat', function() {
  var filter = mainBowerFiles('**/*.css');
  filter.push('./src/**/*.css');
  return gulp
    .src(['./bower_components/**/*.css'])
    .pipe(concatcss('css/styles.css'))
    .pipe(gulp.dest('./dest/'));
});

//Template functions
gulp.task('lint', ['js:lint', 'css:lint']);
gulp.task('js:uglify', ['js:concatApp', 'js:concatBower'], function(){
  return gulp.src('./dest/js/**/*.js')
    .pipe(uglify().on('error', function(e) {
      console.log(e);
    }))
    .pipe(gulp.dest('./dest/js'));
});
gulp.task('css:minify', ['css:concat'] , function() {
  return gulp.src('./dest/css/styles.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./dest/css'));
});

//Apply functions
gulp.task('default', ['lint', 'js:uglify', 'css:minify', 'getAssets', 'replaceHTML']);