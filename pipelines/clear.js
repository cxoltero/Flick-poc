"use strict";
var gulp = require('gulp');
var del = require('del');
var pathType = require('path-type');

gulp.task('clean:dest', function () {

  try{
    var checkdest = pathType.dirSync('./dest');

    if(checkdest){
      del(['./dest']);
      console.log("Directory deleted");
    }
  }catch(err){
    console.log(err);
  }
});