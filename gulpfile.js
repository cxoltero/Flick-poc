var gulp = require('gulp');
var validateCssPipeline = require('pipeline-validate-css')();


gulp.task('default', function() {
    return gulp
        .src(['src/**/*.css'])
        .pipe(validateCssPipeline.validateCSS());
});