var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js')();

gulp.task('js:lint', function() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(validatePipeline.validateJS());
});
