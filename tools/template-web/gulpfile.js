/* global require */
/* global exports */
/* global console */

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const phplint = require('gulp-phplint');
const shell = require('gulp-shell');

const configs = { jshint: { src: ['js/**/*.js', '!vendor/**/*.js', '!3rdparty/**/*.js'] }
                , phplint: { src: [ '**/*.php', '!vendor/**/*.php', '!3rdparty/**/*.php' ] }
                , shell: { bright: 'cd vendor/jagermesh/bright; npm update; gulp'
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

gulp.task('shell:bright', function() {
  return gulp.src('gulpfile.js', {read: false})
             .pipe(shell(configs.shell.bright));
});

gulp.task('shell:touch', function() {
  return gulp.src('gulpfile.js', {read: false})
             .pipe(shell(configs.shell.touch));
});

gulp.task('default', gulp.series( gulp.parallel('shell:bright', 'jshint', 'phplint')
                                , 'shell:touch'));
