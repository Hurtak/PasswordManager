var gulp = require('gulp');

var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

var gulpif = require('gulp-if');
var clean = require('gulp-clean');
// var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var useref = require('gulp-useref');

var browserSync = require('browser-sync');

var basePath = './app';
var paths = {
	img: basePath + '/img/**/*',
	css: [
		basePath + '/css/**/*.css'
	],
	js: basePath + '/js/**/*.js',
	html: [
		basePath + '/**/*.html',
		basePath + '/**/*.htm'
	],
	build: basePath + '/build'
};
var files = {
	css: 'styles.css',
	js: 'scripts.js',
	index: 'index.html'
};

var autoprefixBrowsers = {
	browsers: [
		'> 1%',
		'last 2 versions',
		'Firefox ESR',
		'Opera 12.1',
		'ie >= 8'
	],
	cascade: false
};

// linters

	// js
	gulp.task('lintjs', function() {
		gulp.src(paths.js)
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
	});

	// css
	gulp.task('lintcss', function() {
		gulp.src(paths.css)
			.pipe(csslint())
			.pipe(csslint.reporter());
	});

// clean

	gulp.task('clean', function () {
		gulp.src('dist/*', {read: false})
			.pipe(clean());
	});

// compile

	gulp.task('fonts', function () {
		gulp.src('app/**/*.{eot,svg,ttf,woff}')
			.pipe(flatten())
			.pipe(gulp.dest('dist/fonts'));
	});

	gulp.task('compile', function () {
		var assets = useref.assets();

		gulp.src('app/**/*.html')
			.pipe(assets)
			// .pipe(gulpif('*.js', concat('*.js')))
			// .pipe(gulpif('*.js', uglify()))
			.pipe(gulpif('*.css', autoprefixer(autoprefixBrowsers)))
			.pipe(gulpif('*.css', csso()))
			.pipe(assets.restore())
			.pipe(useref())
			// .pipe(htmlmin({
			// 	removeComments: true,
			// 	collapseWhitespace: true
			// }))
			.pipe(gulp.dest('dist'));
	});

// Browser sync

	gulp.task('browser-sync', function() {
		browserSync({
			server: {
				baseDir: './dist',
				index: files.index
			},
			browser: "chrome"
		});
	});


	gulp.task('browser-sync-dev', function() {
		browserSync({
			server: {
				baseDir: basePath,
				index: files.index
			},
			browser: "chrome"
		});
	});

// gulp tasks

	// builds all files and runs from dist directory
	gulp.task('default', ['lintjs', 'fonts', 'compile', 'browser-sync'], function() {
		// // watch for JS changes
		// gulp.watch(paths.js, ['lintjs', 'compile', browserSync.reload]);

		// // watch for CSS changes
		// gulp.watch(paths.css, ['compile', browserSync.reload]);

		// // watch for HTML changes
		// gulp.watch(paths.html, ['lintjs', 'compile', browserSync.reload]);
	});

	// skips building phase and runs from dist directory
	gulp.task('run', ['browser-sync']);

	// runs from app directory
	gulp.task('dev', ['browser-sync-dev'], function() {
		// watch for JS changes
		gulp.watch(paths.js, ['lintjs', browserSync.reload]);

		// watch for CSS changes
		gulp.watch(paths.css, browserSync.reload);

		// watch for HTML changes
		gulp.watch(paths.html, browserSync.reload);
	});





