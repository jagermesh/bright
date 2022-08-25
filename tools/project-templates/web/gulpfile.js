const gulp = require('gulp');
const eslint = require('gulp-eslint');
const phplint = require('gulp-phplint');
const shell = require('gulp-shell');

const configs = {
  eslint: {
    src: [
      'js/**/*.js',
      '!vendor/**/*.js',
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
    touch: 'for i in $(grep -l -r -e "<script" -e "<link" templates); do node vendor/jagermesh/bright/tools/touch-templates.js "$i"; done;'
  }
};

gulp.task('eslint', function() {
  return gulp.src(configs.eslint.src)
    .pipe(eslint({quiet: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
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
      'eslint',
      'phplint'
    ),
    'shell:touch'
  )
);
