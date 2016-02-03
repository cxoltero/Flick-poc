"use strict";
var gulp = require('gulp');
var del = require('del');
var pathType = require('path-type');

gulp.task('clean:dest', function () {
  var checkDest = pathType.dir('./dest').then(function(isDir){
    return isDir;
  });
  console.log("checking for file");
  if(checkDest){
    del(['./dest']);
  }else{
    return;
  }
});