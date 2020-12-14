var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var sourcemaps      = require('gulp-sourcemaps');

var jsImport        = require('gulp-js-import');
var uglify          = require('gulp-uglify');
var concat          = require('gulp-concat');

var notify          = require('gulp-notify');
var rename          = require('gulp-rename');


var styleSRC        = '../src/scss/style.scss';
var styleURL        = '../dist/css';
var mapURL          = './';


//-------------------------------------                                  
// Styles for Development
//
gulp.task( 'styles-dev', function(done) {
  return gulp.src([ styleSRC ])
    .pipe( sourcemaps.init() )
    .pipe( sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
    }) )
    .on( 'error', console.error.bind( console ) )
    .pipe(autoprefixer( ['> 0.000001%']) )
    .pipe( sourcemaps.write( mapURL ) )
    .pipe( gulp.dest( styleURL ))
    .pipe(notify({
        message: 'SCSS COMPILED',
        onLast: true
    }));
});


//-------------------------------------                                  
// Styles for Production          
//
gulp.task( 'styles-prod', function() {
  return gulp.src([ styleSRC ])
    .pipe( sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
    }) )
    .on( 'error', console.error.bind( console ) )
    .pipe(autoprefixer( ['> 0.000001%']) )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( sourcemaps.write( mapURL ) )
    .pipe( gulp.dest( styleURL ))
    .pipe(notify({
        message: 'SCSS COMPILED PROD',
        onLast: true
    }))
});

//-------------------------------------                                  
// Concatenate JS for Development
//
gulp.task('scripts-dev', function() {
    return gulp.src('../src/js/main.js')
        .pipe(jsImport({hideConsole: true}))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('../dist/js'))
});

//-------------------------------------                                  
// Concatenate & Minify JS for Production
//
gulp.task('scripts-prod', function() {
    return gulp.src('../dist/js/app.js')
        .pipe(concat('app.js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../dist/js'))
});

gulp.task('fonts', function() {
	return gulp.src('../src/fonts/*')
		.pipe(gulp.dest('../dist/fonts/'))
});


//-------------------------------------                                  
// Watch
//
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('../src/scss/**/*.scss', ['styles-dev']);

    // Watch .js files
    gulp.watch('../src/js/**/*.js', ['scripts-dev']);

});

gulp.task('build', gulp.series('styles-prod', 'scripts-prod', 'fonts'));

