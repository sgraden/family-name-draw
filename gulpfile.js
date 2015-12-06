var gulp  = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('./src/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./dist/'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('./src/*.js', ['scripts']);
});