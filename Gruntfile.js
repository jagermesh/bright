module.exports = function(grunt) {

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')
    , concat: {
          options: {
              separator: ''
            , banner: '/* jshint ignore:start */'
          }
        , bright_js: {
              src: [ 'js/br.typeCheck.js'
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
                   , 'js/br.editable.js'
                   , 'js/br.ui.js'
                   , 'js/br.clipboard.js'
                   , 'js/br.rabbitMQ.js'
                   , 'js/br.dataEditor.js'
                   , 'js/br.dataBrowser.js'
                   , 'js/br.exChangeMenu.js'
                   , 'js/br.dataHelpers.js'
                   ]
            , dest: 'js/bright.js'
            , nonull: true
          }
        , bright_core_js_1_0: {
              src: [ '3rdparty/handlebars/js/4.0.11/handlebars.min.js'
                   , '3rdparty/gritter/js/jquery.gritter.min.js'
                   , '3rdparty/promisejs/promise-7.0.4.min.js'
                   , 'js/bright.min.js'
                   ]
            , dest: 'dist/1.0/bright.core.js'
            , nonull: true
          }
        , bright_nojq_js_1_0: {
              src: [ '3rdparty/bootstrap/3.3.7/js/bootstrap.min.js'
                   , 'dist/1.0/bright.core.js'
                   ]
            , dest: 'dist/1.0/bright.nojq.js'
            , nonull: true
          }
        , bright_nobs_js_1_0: {
              src: [ '3rdparty/jquery/jquery-3.2.1.min.js'
                   , 'dist/1.0/bright.core.js'
                   ]
            , dest: 'dist/1.0/bright.nobs.js'
            , nonull: true
          }
        , bright_js_1_0: {
              src: [ '3rdparty/jquery/jquery-3.2.1.min.js'
                   , '3rdparty/bootstrap/3.3.7/js/bootstrap.min.js'
                   , 'dist/1.0/bright.core.js'
                   ]
            , dest: 'dist/1.0/bright.js'
            , nonull: true
          }
      }
    , uglify: {
          options: {
              banner: '/* jshint ignore:start */'
          }
        , bright_js: {
              files: {
                  'js/bright.min.js': [ 'js/bright.js' ]
              }
          }
      }
    , jshint: {
          files: ['Gruntfile.js', 'js/*.js']
        , options: {
              ignores: ['js/bright.js', 'js/bright.min.js']
            ,jshintrc: true
          }
      }
    , phplint: {
          options: {
            phpCmd: "php"
          }
          , all: ["*.php"]
      }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-phplint");

  grunt.registerTask('default', ['jshint', 'phplint:all', 'concat:bright_js', 'uglify:bright_js', 'concat:bright_core_js_1_0', 'concat:bright_nojq_js_1_0', 'concat:bright_nobs_js_1_0', 'concat:bright_js_1_0']);

};
