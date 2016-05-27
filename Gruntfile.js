module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '',
        banner: '/* jshint ignore:start */'
      },
      dist: {
        src: [ 'js/br.typeCheck.js'
             , 'js/br.storage.js'
             , 'js/br.eventQueue.js'
             , 'js/br.request.js'
             , 'js/br.thread.js'
             , 'js/br.js'
             , 'js/br.flagsHolder.js'
             , 'js/br.dataSource.js'
             , 'js/br.dataGrid.js'
             , 'js/br.dataCombo.js'
             , 'js/br.editable.js'
             , 'js/br.ui.js'
             , 'js/br.clipboard.js'
             , 'js/br.rabbitMQ.js'
             ,
             ],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/* jshint ignore:start */ /*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/*.js', '!js/<%= pkg.name %>.min.js'],
      options: {
        ignores: ['js/bright.js', 'js/bright.min.js'],
        jshintrc: true
      }
    },
    phplint: {
        options: {
          phpCmd: "php"
        },
        all: ["*.php"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-phplint");

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'phplint:all']);

};
