var gulp = require('gulp')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel');

gulp.task('default', function() {
	gulp.src('src/*.js')
		//.pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
})