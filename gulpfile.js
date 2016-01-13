'use strict';

var gulp = require('gulp');
var validateCssPipeline = require('pipeline-validate-css')();


gulp.task('css:lint', function() {
    return gulp
        .src(['src/**/*.css'])
        .pipe(validateCssPipeline.validateCSS());
});