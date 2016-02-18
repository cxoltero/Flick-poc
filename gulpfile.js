'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
var pipelines = requireDir('./pipelines');
var runSequence = require('run-sequence').use(gulp);

gulp.task("main", function(){
  runSequence('clean:dest', 'applyJS', 'applyCSS', 'copy:assets');
});
gulp.task('default', ['main']);