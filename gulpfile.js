const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sass = require('gulp-sass-universal');
const eslint = require('gulp-eslint');
const phplint = require('gulp-phplint');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const merge = require('merge-stream');

const configs = {
  eslint: {
    src: ['js/**/*.js']
  },
  phplint: {
    src: ['**/*.php', '!vendor/**/*.php', '!node_modules/**/*.php']
  },
  uglify: {
    libs: [{
      dest: '3rdparty/promisejs/latest/js/',
      src: ['3rdparty/promisejs/latest/js/promise.js']
    }, {
      dest: '3rdparty/bootstrap/2.3.2/js/',
      src: ['3rdparty/bootstrap/2.3.2/js/bootstrap.js']
    }, {
      dest: '3rdparty/gritter/latest/js/',
      src: ['3rdparty/gritter/latest/js/jquery.gritter.js']
    }, {
      dest: '3rdparty/handlebars/4.7.7/js/',
      src: ['3rdparty/handlebars/4.7.7/js/handlebars.js']
    }, {
      dest: '3rdparty/handlebars/latest/js/',
      src: ['3rdparty/handlebars/latest/js/handlebars.js']
    }, {
      dest: '3rdparty/fileuploader/latest/js/',
      src: ['3rdparty/fileuploader/latest/js/fileuploader.js']
    }, {
      dest: '3rdparty/select2/3.5.4/js/',
      src: ['3rdparty/select2/3.5.4/js/select2.js']
    }],
    dist: [{
      dest: 'dist/js/',
      src: ['dist/js/*.js', '!dist/js/*.min.js']
    }]
  },
  sass: {
    src: ['sass/**/*.scss'],
    dest: 'css/'
  },
  concat: {
    css: [{
      src: ['3rdparty/gritter/latest/css/jquery.gritter.css', 'css/bright.bs2.css'],
      name: 'bright.bs2.css',
      dest: 'dist/css/'
    }, {
      src: ['3rdparty/gritter/latest/css/jquery.gritter.css', 'css/bright.bs3.css'],
      name: 'bright.bs3.css',
      dest: 'dist/css/'
    }, {
      src: ['3rdparty/gritter/latest/css/jquery.gritter.css', 'css/bright.bs4.css'],
      name: 'bright.bs4.css',
      dest: 'dist/css/'
    }, {
      src: ['3rdparty/gritter/latest/css/jquery.gritter.css', 'css/bright.bs4.css'],
      name: 'bright.latest.css',
      dest: 'dist/css/'
    }],
    core: [{
      src: [
        'node_modules/js-smart-hint/smart-hint.js',
        'node_modules/js-link-previewer/link-previewer.js',
        'node_modules/js-flyovers/flyovers.js',
        '3rdparty/handlebars/latest/js/handlebars.min.js',
        '3rdparty/gritter/latest/js/jquery.gritter.min.js',
        '3rdparty/promisejs/latest/js/promise.min.js',
        'js/br.polyfills.js',
        'js/br.typeCheck.js',
        'js/br.storage.js',
        'js/br.eventQueue.js',
        'js/br.request.js',
        'js/br.thread.js',
        'js/br.profiler.js',
        'js/br.webCamera.js',
        'js/br.core.js',
        'js/br.flagsHolder.js',
        'js/br.dataSource.js',
        'js/br.table.js',
        'js/br.dataGrid.js',
        'js/br.dataCombo.js',
        'js/br.editable.js',
        'js/br.ui.js',
        'js/br.clipboard.js',
        'js/br.dataEditor.js',
        'js/br.dataBrowser.js',
        'js/br.dropDownMenu.js',
        'js/br.dataHelpers.js',
        'js/br.draggable.js',
        'js/br.googleMap.js',
        'js/br.eventBus.js'
      ],
      name: 'bright.core.js',
      dest: 'dist/js/'
    }],
    dist: [{
      src: [
        '3rdparty/bootstrap/latest/js/bootstrap.min.js',
        'dist/js/bright.core.js'
      ],
      name: 'bright.nojq.js',
      dest: 'dist/js/'
    }, {
      src: [
        '3rdparty/jquery/latest/js/jquery.min.js',
        'dist/js/bright.core.js'
      ],
      name: 'bright.nobs.js',
      dest: 'dist/js/'
    }, {
      src: [
        '3rdparty/jquery/latest/js/jquery.min.js',
        '3rdparty/bootstrap/2.3.2/js/bootstrap.min.js',
        'dist/js/bright.core.js'
      ],
      name: 'bright.bs2.js',
      dest: 'dist/js/'
    }, {
      src: [
        '3rdparty/jquery/latest/js/jquery.min.js',
        '3rdparty/bootstrap/3.4.1/js/bootstrap.min.js',
        'dist/js/bright.core.js'
      ],
      name: 'bright.bs3.js',
      dest: 'dist/js/'
    }, {
      src: [
        '3rdparty/jquery/latest/js/jquery.min.js',
        '3rdparty/bootstrap/4.6.0/js/bootstrap.bundle.min.js',
        'dist/js/bright.core.js'
      ],
      name: 'bright.bs4.js',
      dest: 'dist/js/'
    }, {
      src: [
        '3rdparty/jquery/latest/js/jquery.min.js',
        '3rdparty/bootstrap/4.6.0/js/bootstrap.bundle.min.js',
        'dist/js/bright.core.js'
      ],
      name: 'bright.latest.js',
      dest: 'dist/js/'
    }]
  },
  shell: {
    chmod: 'chmod 644 dist/js/*.js && chmod 644 dist/css/*.css',
    test: 'php vendor/codeception/codeception/codecept run'
  }
};

gulp.task('eslint', function() {
  return gulp.src(configs.eslint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('phplint', function() {
  return gulp.src(configs.phplint.src)
    .pipe(phplint('', {
      skipPassedFiles: true
    }))
    .pipe(phplint.reporter('default'))
    .pipe(phplint.reporter('fail'));
});

gulp.task('uglify:libs', function() {
  let tasks = configs.uglify.libs.map(function(task) {
    return gulp.src(task.src)
      .pipe(terser({
        compress: false,
        mangle: false
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(task.dest));
  });
  return merge(tasks);
});

gulp.task('uglify:dist', function() {
  let tasks = configs.uglify.dist.map(function(task) {
    return gulp.src(task.src)
      .pipe(terser({
        compress: false,
        mangle: false
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(task.dest));
  });
  return merge(tasks);
});

gulp.task('sass', function() {
  return gulp.src(configs.sass.src)
    .pipe(sass())
    .pipe(gulp.dest(configs.sass.dest));
});

function _concat(cfg) {
  let tasks = cfg.map(function(task) {
    return gulp.src(task.src)
      .pipe(concat(task.name, {
        newLine: '\r\n'
      }))
      .pipe(gulp.dest(task.dest));
  });
  return merge(tasks);
}

gulp.task('concat:css', function() {
  return _concat(configs.concat.css);
});

gulp.task('concat:core', function() {
  return _concat(configs.concat.core);
});

gulp.task('concat:dist', function() {
  return _concat(configs.concat.dist);
});

gulp.task('shell:chmod', function() {
  return gulp.src('gulpfile.js', {
    read: false
  }).pipe(shell(configs.shell.chmod));
});

gulp.task('shell:test', function() {
  return gulp.src('gulpfile.js', {
    read: false
  }).pipe(shell(configs.shell.test));
});

gulp.task('build',
  gulp.series(
    gulp.parallel('eslint', 'phplint', 'uglify:libs'),
    'sass',
    'concat:core',
    gulp.parallel('concat:dist', 'concat:css'),
    'uglify:dist',
    'shell:chmod'
  )
);

gulp.task('css',
  gulp.series(
    'concat:css',
    'shell:chmod'
  )
);

gulp.task('test',
  gulp.series(
    'shell:test'
  )
);

gulp.task('default',
  gulp.series(
    'build',
    'shell:test'
  )
);