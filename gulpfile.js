var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync'], function() {

});

//static server
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8008",
		files: ["public/**/*.*"],
        //browser: "chromium-browser", //For chromium
		browser: "google-chrome", //For mac
		port: 8000
	});
});

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	})
});

// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}