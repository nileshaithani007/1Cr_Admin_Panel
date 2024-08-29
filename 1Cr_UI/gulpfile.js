import gulp from 'gulp';
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import sourcemaps from 'gulp-sourcemaps';
import cssbeautify from "gulp-cssbeautify";
import beautify from 'gulp-beautify';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);



/*******************  LTR   ******************/

//_______ task for scss folder to css main style 
gulp.task('watch', function() {
	console.log('Command executed successfully compiling SCSS in assets.');
	 return gulp.src('src/assets/scss/**/*.scss') 
		.pipe(sourcemaps.init())                       
		.pipe(sass())
		.pipe(beautify.css({ indent_size: 4 }))
		.pipe(sourcemaps.write(''))   
		.pipe(gulp.dest('src/assets/css'))
		.pipe(browserSync.reload({
		  stream: true
	}))
})
