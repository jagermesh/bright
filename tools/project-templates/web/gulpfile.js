/* global require */
/* global exports */
/* global process */

const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass-universal');
const jshint = require('gulp-jshint');
const terser = require('gulp-terser');
const phplint = require('gulp-phplint');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const merge = require('merge-stream');
const child_process = require('child_process');

const configs = {
  jshint: {
    src: [
    'js/**/*.js',
    '!vendor/**/*.js',
    '!node_modules/**/*.js',
    '!3rdparty/**/*.js']
  },
  phplint: {
    src: [
      '**/*.php',
      '!vendor/**/*.php',
      '!node_modules/**/*.php',
      '!3rdparty/**/*.php'
    ]
  },
  shell: {
    touch: 'for i in $(grep -l -r -e "<script" -e "<link" templates); do node vendor/jagermesh/bright/tools/randomize-urls.js "$i"; done;'
  }
};

gulp.task('jshint', function() {
  return gulp.src(configs.jshint.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('phplint', function() {
  return gulp.src(configs.phplint.src)
    .pipe(phplint('', { skipPassedFiles: true }))
    .pipe(phplint.reporter('default'))
    .pipe(phplint.reporter('fail'));
});

gulp.task('shell:touch', function() {
  return gulp.src('gulpfile.js', {read: false})
    .pipe(shell(configs.shell.touch));
});

gulp.task('build',
  gulp.series(
    gulp.parallel(
      'jshint',
      'phplint'
    ),
    'shell:touch'
  )
);
