'use strict';

// general
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

// images
var imagemin = require('gulp-imagemin');

// javascript
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// environment flags
var env = 'dev'; // default
var gulpif = require('gulp-if');

//////////////////////////////////////////////////
// Variables
//////////////////////////////////////////////////

var sourceDir = 'public';
var destDir = 'dist';

var config = {
  jsSrcDir: sourceDir + '/js',
  imgSrcDir: sourceDir + '/assets'
};

//////////////////////////////////////////////////
// Base Tasks
//////////////////////////////////////////////////

gulp.task('build', function (cb) {
  runSequence('clean', ['scripts', 'images', 'copy'], cb);
});

gulp.task('deploy', function () {
  env = 'prod';
  gulp.start('build');
});

gulp.task('watch', ['build'], function () {
  gulp.watch(config.jsSrcDir+'/**/*.*', ['build']);
  gulp.watch(config.imgSrcDir+'/**/*.*', ['build']);
  gulp.watch(sourceDir+'/index.html', ['build']);
});

gulp.task('default', function () {
  console.log('');
  console.log('');
  console.log('To deploy for production, run "gulp build" or "gulp deploy"');
  console.log('  - Cleans dist folder');
  console.log('  - Generates final built files');
  console.log('  - "deploy" additionally strips out comments and such');
  console.log('Use "gulp clean" to wipe the dist directory');
  console.log('Use "gulp watch" to re-build as source changes');
  console.log('');
  console.log('');
});

//////////////////////////////////////////////////
// Task Details
//////////////////////////////////////////////////

// Negated glob patterns with node-glob are tricky
// del (package) doesn't support the ignore pattern
// so we have to do some fun with negation to get it to
// work

gulp.task('clean', function () {
  return del(['dist/**/*']);
});

gulp.task('images', function () {
  var files = [
    config.imgSrcDir + '/**/*.*'
  ];

  return gulp.src(files)
    .pipe(imagemin())
    .pipe(gulp.dest(destDir + '/assets'));
});

gulp.task('scripts', function () {
  var files = [
    config.jsSrcDir + '/utils.js',
    config.jsSrcDir + '/consts.js',
    config.jsSrcDir + '/states/misc/boot.js',
    config.jsSrcDir + '/states/misc/preload.js',
    config.jsSrcDir + '/states/misc/title.js',
    config.jsSrcDir + '/states/misc/intro.js',
    config.jsSrcDir + '/states/misc/victory.js',
    config.jsSrcDir + '/states/main/play.js',
    config.jsSrcDir + '/states/main/play-waiter.js',
    config.jsSrcDir + '/states/main/play-tables.js',
    config.jsSrcDir + '/states/main/play-timing.js',
    config.jsSrcDir + '/states/main/play-points.js',
    config.jsSrcDir + '/states/main/play-audio.js',
    config.jsSrcDir + '/states/main/play-input.js',
  ];

  return gulp.src(files)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('game.js'))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(gulpif(env === 'prod', uglify({compress: {drop_console: true}})))
    .pipe(gulp.dest(destDir + '/js'));
});

gulp.task('copy', function () {
  var files = ['public/lib/**/*', 'public/index.html'];

  gulp.src(files, { base: './public/'})
    .pipe(gulp.dest(destDir));
});
