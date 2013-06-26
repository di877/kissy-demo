module.exports = function(grunt) {

  var DIR_CSS   = './assets/stylesheets/',
      DIR_JS    = './assets/javascripts/',
      DIR_BUILD = './assets/build/';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          sassDir: DIR_CSS + 'src/',
          cssDir : DIR_CSS + 'compiled/'
        }
      }
    },

    cssmin: {
      compress: {
        files: {
          './assets/build/style-min.css': [DIR_CSS + 'compiled/style.css']
        }
      }
    },

    concat: {
      core: {
        src : [DIR_JS + 'package.js', DIR_JS + 'core.js'],
        dest: DIR_BUILD + 'core.js'
      }
    },

    watch: {
      compass: {
        files: [DIR_CSS + 'src/*.sass'],
        tasks: ['compass', 'cssmin']
      },
      js: {
        files: [DIR_JS + '*.js'],
        tasks: ['concat']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compass', 'cssmin', 'concat']);

};