const gulp         = require('gulp'),
      pcss         = require('gulp-postcss'),
      nestedcss    = require('postcss-nested'),
      autoprefixer = require('autoprefixer'),
      concat       = require('gulp-concat'),
      sourcemaps   = require('gulp-sourcemaps'),
      gulpIf       = require('gulp-if'),
      // newer        = require('gulp-newer'),
      remember     = require('gulp-remember'),
      bs           = require('browser-sync').create(),
      notify       = require('gulp-notify'),
      mpipe        = require('multipipe'),
      pug          = require('gulp-pug')
;

let isDev = true;

gulp.task('styles', function() {
  let processors = [
    autoprefixer({browsers: ['last 4 version']}),
    nestedcss,
  ];

  let stream = mpipe(gulp.src('dev/main.pcss', {since: gulp.lastRun('styles')}),
      gulpIf(isDev, sourcemaps.init()),
      pcss(processors),
      remember('styles-cached'),
      concat('styles.css'),
      gulpIf(isDev, sourcemaps.write()),
      gulp.dest('./public/'));

  return stream.on('error', notify.onError(function(err) {
    return {
      title  : 'styles',
      message: err.message,
    };
  }));
});

gulp.task('html', function() {

  let stream2 = mpipe(gulp.src('./dev/index.pug', {since: gulp.lastRun('html')}),
      pug(),
      gulp.dest('./public/')
  );

  return stream2.on('error', notify.onError(function(err) {
        return {
          title  : 'styles',
          message: err.message,
        };
      }
  ));
});

gulp.task('js', function() {
  return gulp.src('./dev/index.js').
      pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
  gulp.watch('./dev/**/*.pcss', gulp.series('styles')).on('unlink', function(filepath) {
    remember.forget('styles-cached', path.resolve(filepath));
  });
  gulp.watch('./dev/**/*.{jpg,png,ico,svg,gif}', gulp.series('imgs'));
  gulp.watch('./dev/**/*.pug', gulp.series('html'));
  gulp.watch('./dev/**/*.js', gulp.series('js'));
});

gulp.task('serve', function() {
  bs.init({
    server: {
      baseDir: './public',
    },
  });
  return bs.watch('public/**/*.*').on('change', bs.reload);
});
gulp.task('imgs', function() {
  return gulp.src('./dev/assets/*.*').
      pipe(gulp.dest('public/assets'));
});

gulp.task('default', gulp.series(gulp.parallel('styles', 'html', 'js', 'imgs'), gulp.parallel('watch', 'serve')));
