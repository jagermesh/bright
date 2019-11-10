/* global require */
/* global exports */
/* global console */

const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const terser = require('gulp-terser');
const phplint = require('gulp-phplint');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const merge = require('merge-stream');
const child_process = require('child_process');

const configs = { jshint: { src: ['js/**/*.js', 'backend/js/**/*.js', '!js/scripts.js'] }
                , phplint: { src: [ '**/*.php', '!vendor/**/*.php' ] }
                , uglify: [ { dest: 'js/', src: ['js/*.bundle.js', '!js/*.min.js'] }
                          ]
                , shell: { bright: 'cd vendor/jagermesh/bright; npm update; gulp build'
                         , touch: 'node vendor/jagermesh/bright/tools/randomize-urls.js templates/head.html; node vendor/jagermesh/bright/tools/randomize-urls.js templates/footer.html'
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

gulp.task('uglify', function() {
  var tasks = configs.uglify.map(function(task) {
    return gulp.src(task.src)
               .pipe(terser({ output: { preamble: '/* jshint ignore:start */\n', ascii_only: true }, compress: false}))
               .pipe(rename({ suffix: '.min' }))
               .pipe(gulp.dest(task.dest));
  });
  return merge(tasks);
});

function _concat(cfg) {
  var tasks = cfg.map(function(task) {
    return gulp.src(task.src)
               .pipe(concat(task.name, { newLine: '\r\n' }))
               .pipe(gulp.dest(task.dest));
  });
  return merge(tasks);
}

gulp.task('concat:poi', function() {
  return _concat(configs.concat.poi);
});

gulp.task('shell:bright', function() {
  return gulp.src('gulpfile.js', {read: false})
             .pipe(shell(configs.shell.bright));
});

gulp.task('shell:touch', function() {
  return gulp.src('gulpfile.js', {read: false})
             .pipe(shell(configs.shell.touch));
});

gulp.task('default', gulp.series( gulp.parallel('shell:bright', 'jshint', 'phplint')
                                , 'concat:poi'
                                , 'uglify'
                                , 'shell:touch'));

gulp.task('deploy', gulp.series( gulp.parallel('jshint', 'phplint')
                              , 'concat:poi'
                              , 'uglify'
                              , 'shell:touch'));
