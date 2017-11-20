'use strict';
const gulp         = require('gulp'),
      pcss         = require('gulp-postcss'),
      nestedcss    = require('postcss-nested'),
      autoprefixer = require('autoprefixer'),
      // rename       = require('gulp-rename'),
      concat       = require('gulp-concat'),
      sourcemaps   = require('gulp-sourcemaps'),
      gulpIf       = require('gulp-if'),
      del          = require('del'),
      debug        = require('gulp-debug'),
      newer        = require('gulp-newer'),
      remember     = require('gulp-remember'),
      path         = require('path'),
      bs           = require('browser-sync').create(),
      notify       = require('gulp-notify'),
      mpipe        = require('multipipe');
// atImport     = require('postcss-import');

//to build production use $ NODE_ENV=prod gulp <task>
let isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev';

gulp.task('styles', function() {
  let processors = [
    autoprefixer({browsers: ['last 2 version']}),
    nestedcss,
  ];

  let stream = mpipe(gulp.src('./frontend/blocks/**/*.pcss', {since: gulp.lastRun('styles')}),
      gulpIf(isDev, sourcemaps.init()), //todo: if(true)-sourcemap, else - uglify ()
      pcss(processors),
      remember('styles-cached'),
      concat('styles.css'),
      gulpIf(isDev, sourcemaps.write()),
      gulp.dest('./public/dev'));

  return stream.on('error', notify.onError(function(err) {
    return {
      title  : 'styles',
      message: err.message,
    };
  }));
});

gulp.task('clean', function() {
  return del('./public/dev/*');
});

gulp.task('imgs', function() {
  return gulp.src('./frontend/blocks/**/*.{jpg,png,ico,svg}', {since: gulp.lastRun('imgs')}).
      //if you need to delete\undo files several time and expect responce in compiled folder - 'since' wouldn't work. use gulp-cached instead.
      pipe(newer('public/dev/')).
      //todo: change to real when imgs will put on one common folder
      pipe(debug({title: 'images'})).
      pipe(gulp.dest('./public/dev'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'imgs')));

gulp.task('watch', function() {
  gulp.watch('./frontend/blocks/**/*.pcss', gulp.series('styles')).on('unlink', function(filepath) {
    remember.forget('styles-cached', path.resolve(filepath)); //filepath must be equal to filepath in stream of relevant task. I.e. if filename changes (*.css -> *.min.css) - this wouldn't work.
  });

  gulp.watch('./frontend/blocks/**/*.{jpg,png,ico,svg}', gulp.series('imgs'));
});

gulp.task('serve', function() {
  bs.init({
    server: {
      baseDir: '/public/dev',
    },
  });
  bs.watch('public/**/*.*').on('change', bs.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

gulp.task('default', gulp.series(''));
