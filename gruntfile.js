module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    curl: {
      // Short format (dest: src)
      'scripts/animation.js': 'http://animation.io/engine/animation.js'
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      scenes: {
        src: 'scenes/*.js',
        dest: 'scripts/scenes.min.js'
      },
      customscripts: {
        src: 'scripts/*.js',
        dest: 'scripts/scripts.min.js'
      }
    },
    watch: {
      scripts: {
        atBegin: true,
        files: ['../scenes/*.js', '../scripts/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
    jasmine: {
      pivotal: {
        src: ['scenes/*.js', 'customscripts/*.js'],
        options: {
          specs: 'tests/spec/*.js',
          vendor: 'scripts/animation.js'
        }
      }
    },
    ftpush: {
      build: {
        auth: {
          host: process.env.FTP_HOST,
          port: 21,
          username: process.env.FTP_USERNAME,
          password: process.env.FTP_PASSWORD
        },
        src: './',
        dest: process.env.FTP_PATH,
        exclusions: ['**/.DS_Store', 'node_modules', '.git', '.gitignore', 'gruntfile.js', 'package.json', '.grunt', 'README.md'],
        keep: ['.htaccess', '.htpasswd'],
        simple: true,
        useList: false
      }
    },
    sass: {
      files: {
        'css/custom.css': 'css/custom.scss'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-ftpush');
  grunt.loadNpmTasks('grunt-sass');

  // Default task(s).
  grunt.registerTask('default', ['curl', 'uglify', 'sass']);
  grunt.registerTask('deploy', ['default', 'ftpush']);

};