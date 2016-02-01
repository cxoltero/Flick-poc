'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./pipelines');

gulp.task('default', ['applyJS', 'applyCSS', 'copy:assets']);