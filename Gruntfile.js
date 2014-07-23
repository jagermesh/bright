module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: [ 'js/br.typeCheck.js'
             , 'js/br.storage.js'
             , 'js/br.eventQueue.js'
             , 'js/br.request.js'
             , 'js/br.js'
             , 'js/br.flagsHolder.js'
             , 'js/br.dataSource.js'
             , 'js/br.dataGrid.js'
             , 'js/br.dataCombo.js'
             , 'js/br.editable.js'
             , 'js/br.ui.js'
             , 'js/br.clipboard.js'
             ,
             ],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    jshint: {
      files: ['Gruntfile.js', 'js/*.js', '!js/<%= pkg.name %>.min.js'],
      options: {
        // options here to override JSHint defaults
        laxcomma: true,
        loopfunc: true,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }
    // watch: {
    //   files: ['<%= jshint.files %>'],
    //   tasks: ['jshint', 'qunit']
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // grunt.registerTask('test', ['jshint', 'qunit']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
