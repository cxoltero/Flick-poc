'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
var pipelines = requireDir('./pipelines');

gulp.task('default', ['applyJS', 'applyCSS', 'copy:assets']);