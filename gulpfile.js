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
var build1 = require('./pipelines/build');

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
gulp.task('js:concat:bower', function () {
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
gulp.task('getImages', function () {
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
    .pipe(gulp.dest('dest/'))
});

//concatenate stylesheets
gulp.task('css:concat', function() {
  var filter = mainBowerFiles('**/*.css');
  filter.push('./src/**/*.css');
  return gulp
    .src(filter)
    .pipe(concatcss('css/styles.css'))
    .pipe(gulp.dest('./dest/'));
});

//Template functions
gulp.task('js:uglify', ['js:concatApp', 'js:concat:bower'], function(){
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


gulp.task('applyCSS', ['css:lint', 'css:minify']);
gulp.task('applyJS', ['js:lint', 'js:uglify']);
gulp.task('copy:assets', ['getImages', 'replaceHTML']);

//Apply functions
gulp.task('default', ['applyJS', 'applyCSS', 'copy:assets']);
