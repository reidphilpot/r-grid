var gulp = require('gulp')
  , rjs = require('gulp-requirejs')
  , concatCss = require('gulp-concat-css')
  , uglify = require('gulp-uglify')
 
gulp.task('default', ['css'], function() {
  rjs({
    baseUrl: '.',
    name: 'node_modules/almond/almond',
    include: ['grid'],
    out: 'dist/r-grid.min.js',
    wrap: {
      startFile: 'bin/start.frag',
      endFile: 'bin/end.frag'
    },
    paths: {
      'd3': 'empty:',
      'underscore': 'empty:',
      'text': 'node_modules/requirejs-text/text'
    },
    shim: {
      'd3': {
        exports: 'd3'  
      },
      'underscore': {
        exports: '_'  
      }
    }
  })
  .pipe(uglify())
  .pipe(gulp.dest('./'))
})

gulp.task('css', function () {
  return gulp.src('*.css')
    .pipe(concatCss('dist/r-grid.min.css'))
    .pipe(gulp.dest('./'))
})