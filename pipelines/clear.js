"use strict";
var gulp = require('gulp');
var fs = require('fs');
var rmdir = require('rmdir');

gulp.task('clean:dest', function () {
  fs.exists('./dest', function(res){
    if(res){
      rmdir('./dest', function(err, dir, files){
        console.log("Dest folder has been deleted");
      });
    }
  });
});