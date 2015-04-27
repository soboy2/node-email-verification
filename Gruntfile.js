module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //JS Tasks
    jshint: {
      all: ['Gruntfile.js', '*.js']
    },

    //watch js files and perform above tasks
    watch: {
      js: {
        files: ['*.js'],
        tasks: ['jshint']
      }
    },

    //nodemon
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    //run watch and nodemon together
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //load nodemon
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  //register the nodemon task when we run grunt
  grunt.registerTask('default', ['jshint', 'nodemon', 'concurrent']);

};
