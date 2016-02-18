'use strict';
var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var htmlreplace = require('gulp-html-replace');

//collect required assets
gulp.task('getImages', function () {
  var assets = mainBowerFiles(['**/*.png', '**/*.gif']);
  return gulp
    .src(assets)
    .pipe(gulp.dest('./dest/lightbox2/dist/images'));
});
gulp.task('replaceHTML',['getImages'], function() {
  return gulp.src('./src/index.html')
    .pipe(htmlreplace({
      'css': './css/styles.css',
      'js': ['./js/vendor.min.js', './js/app.min.js']
    }))
    .pipe(gulp.dest('dest/'));
});

gulp.task('copy:assets', ['replaceHTML']);