'use strict';
var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var htmlreplace = require('gulp-html-replace');

//var buildGulp = function(){
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

  return gulp.task('copy:assets', ['getImages', 'replaceHTML']);
//};
//
//module.exports = buildGulp;