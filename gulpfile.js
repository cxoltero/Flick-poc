'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
var pipelines = requireDir('./pipelines');

gulp.task("main", ['applyJS', 'applyCSS', 'copy:assets']);
gulp.task('default', ['clean:dest','main']);