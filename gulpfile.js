/* global require */
/* global exports */
/* global console */

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const phplint = require('gulp-phplint');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const merge = require('merge-stream');
const child_process = require('child_process');
const del = require('del');

const configs = { jshint: { src: ['js/**/*.js'] }
                , phplint: { src: [ '**/*.php' ] }
                , uglify: { libs: [ { dest: '3rdparty/promisejs/latest/js/', src: ['3rdparty/promisejs/latest/js/promise.js'] }
                                  , { dest: '3rdparty/bootstrap/2.3.2/js/', src: ['3rdparty/bootstrap/2.3.2/js/bootstrap.js'] }
                                  , { dest: '3rdparty/gritter/latest/js/', src: '3rdparty/gritter/latest/js/jquery.gritter.js' }
                                  , { dest: '3rdparty/handlebars/4.1.2/js/', src: '3rdparty/handlebars/4.1.2/js/handlebars.js' }
                                  , { dest: '3rdparty/handlebars/latest/js/', src: '3rdparty/handlebars/latest/js/handlebars.js' }
                                  , { dest: '3rdparty/fileuploader/latest/js/', src: '3rdparty/fileuploader/latest/js/fileuploader.js' }
                                  ]
                          , dist: [ { dest: 'dist/js/', src: 'dist/js/*.js' }
                                  ]
                          }
                , concat: { bright: [ { src: [ 'js/br.typeCheck.js'
                                             , 'js/br.storage.js'
                                             , 'js/br.eventQueue.js'
                                             , 'js/br.request.js'
                                             , 'js/br.thread.js'
                                             , 'js/br.profiler.js'
                                             , 'js/br.webCamera.js'
                                             , 'js/br.js'
                                             , 'js/br.flagsHolder.js'
                                             , 'js/br.dataSource.js'
                                             , 'js/br.table.js'
                                             , 'js/br.dataGrid.js'
                                             , 'js/br.dataCombo.js'
                                             , 'js/br.draggable.js'
                                             , 'js/br.editable.js'
                                             , 'js/br.ui.js'
                                             , 'js/br.clipboard.js'
                                             , 'js/br.rabbitMQ.js'
                                             , 'js/br.dataEditor.js'
                                             , 'js/br.dataBrowser.js'
                                             , 'js/br.exChangeMenu.js'
                                             , 'js/br.dataHelpers.js'
                                             , 'js/br.googleMap.js'
                                             ]
                                      , name: 'bright.js'
                                      , dest: 'js/'
                                      }
                                    ]
                          , css: [ { src: [ '3rdparty/gritter/latest/css/jquery.gritter.css'
                                          , 'css/bright.css'
                                          ]
                                   , name: 'bright.css'
                                   , dest: 'dist/css/'
                                   }
                                 , { src: [ '3rdparty/gritter/latest/css/jquery.gritter.css'
                                          , 'css/bright-bootstrap2.css'
                                          ]
                                   , name: 'bright-bootstrap2.css'
                                   , dest: 'dist/css/'
                                   }
                                 , { src: [ '3rdparty/gritter/latest/css/jquery.gritter.css'
                                          , 'css/bright-bootstrap3.css'
                                          ]
                                   , name: 'bright-bootstrap3.css'
                                   , dest: 'dist/css/'
                                   }
                                 ]
                          , core: [ { src: [ '3rdparty/handlebars/latest/js/handlebars.min.js'
                                           , '3rdparty/gritter/latest/js/jquery.gritter.min.js'
                                           , '3rdparty/promisejs/latest/js/promise.min.js'
                                           , 'js/bright.js'
                                           ]
                                    , name: 'bright.core.js'
                                    , dest: 'dist/js/'
                                    }
                                  ]
                          , dist: [ { src: [ '3rdparty/bootstrap/latest/js/bootstrap.min.js'
                                           , 'dist/js/bright.core.js'
                                           ]
                                    , name: 'bright.nojq.js'
                                    , dest: 'dist/js/'
                                    }
                                  , { src: [ '3rdparty/jquery/latest/js/jquery.min.js'
                                           , 'dist/js/bright.core.js'
                                           ]
                                    , name: 'bright.nobs.js'
                                    , dest: 'dist/js/'
                                    }
                                  , { src: [ '3rdparty/jquery/latest/js/jquery.min.js'
                                           , '3rdparty/bootstrap/latest/js/bootstrap.min.js'
                                           , 'dist/js/bright.core.js'
                                           ]
                                    , name: 'bright.js'
                                    , dest: 'dist/js/'
                                    }
                                  , { src: [ '3rdparty/jquery/latest/js/jquery.min.js'
                                           , '3rdparty/bootstrap/2.3.2/js/bootstrap.min.js'
                                           , 'dist/js/bright.core.js'
                                           ]
                                    , name: 'bright.bs2.js'
                                    , dest: 'dist/js/'
                                    }
                                  , { src: [ '3rdparty/jquery/latest/js/jquery.min.js'
                                           , '3rdparty/bootstrap/3.4.1/js/bootstrap.min.js'
                                           , 'dist/js/bright.core.js'
                                           ]
                                    , name: 'bright.bs3.js'
                                    , dest: 'dist/js/'
                                    }
                                  ]
                          }
                , sass: { src: ['css/sass/**/*.scss'], dest: 'css/' }
                , shell: { chmod: 'chmod 644 dist/js/*.js && chmod 644 dist/css/*.css' }
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

gulp.task('uglify:libs', function() {
  var tasks = configs.uglify.libs.map(function(task) {
    return gulp.src(task.src)
               .pipe(uglify({ output: { preamble: '/* jshint ignore:start */\n', ascii_only: true }}))
               .pipe(rename({ suffix: '.min' }))
               .pipe(gulp.dest(task.dest));
  });
  return merge(tasks);
});

gulp.task('uglify:dist', function() {
  var tasks = configs.uglify.dist.map(function(task) {
    return gulp.src(task.src)
               .pipe(uglify({ output: { preamble: '/* jshint ignore:start */\n', ascii_only: true }}))
               .pipe(rename({ suffix: '.min' }))
               .pipe(gulp.dest(task.dest));
  });
  return merge(tasks);
});

gulp.task('sass', function() {
  return gulp.src(configs.sass.src)
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest(configs.sass.dest));
});

function _concat(cfg) {
  var tasks = cfg.map(function(task) {
    return gulp.src(task.src)
               .pipe(concat(task.name, { newLine: '\r\n' }))
               .pipe(gulp.dest(task.dest));
  });
  return merge(tasks);
}

gulp.task('concat:css', gulp.series('sass', function() {
  return _concat(configs.concat.css);
}));

gulp.task('concat:bright', function() {
  return _concat(configs.concat.bright);
});

gulp.task('concat:core', gulp.series('concat:bright', function() {
  return _concat(configs.concat.core);
}));

gulp.task('clean:dist', function() {
  return del(['dist/']);
});

gulp.task('concat:dist', gulp.series('clean:dist', 'concat:core', function() {
  return _concat(configs.concat.dist);
}));

gulp.task('shell:chmod', function() {
  return gulp.src('gulpfile.js', {read: false})
             .pipe(shell(configs.shell.chmod));
});

gulp.task('default', gulp.series( gulp.parallel('jshint', 'phplint', 'uglify:libs')
                                , gulp.parallel('concat:dist', 'concat:css')
                                , 'uglify:dist'
                                , 'shell:chmod'));
gulp.task('css', gulp.series('concat:css', 'shell:chmod'));
