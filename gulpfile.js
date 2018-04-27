const gulp = require('gulp');
const minifyCSS = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');

gulp.task('css', ()=> {
	gulp.src('src/css/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('build/css/'));
});

gulp.task('html', ()=> {
	gulp.src('src/html/*.html')
		.pipe(htmlmin())
		.pipe(gulp.dest('build/html/'));
});

gulp.task('js', ()=> {
  gulp.src('src/js/*.js')
  	.pipe(uglify())
  	.pipe(gulp.dest('build/js/'));
});

gulp.task('default', ['css', 'html', 'js']);