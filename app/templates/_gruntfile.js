// Generated on 2014-05-21 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        pkg: require('./package.json'),

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            gruntfile: {
              files: ['Gruntfile.js']
            },
            livereload: {
              options: {
                livereload: '<%%= connect.options.livereload %>'
              },
              files: [
                '<%%= config.app %>/index.html',
                '<%%= config.app %>/images/{,*/}*'
              ]
            },
            files: ['<%%= config.app %>/index.html'],
            tasks: ['inlinecss']
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: false,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%%= config.dist %>',
                    livereload: false
                }
            }
        },
        inlinecss: {
          main: {
            options: {
            },
            files: {
              '<%%= config.app %>/template.html': '<%%= config.app %>/index.html'
            }
          }
        },
        replace: {
          example: {
            src: ['<%%= config.dist %>/template.html'],             // source files array (supports minimatch)
            dest: '<%%= config.dist %>/template.html',             // destination directory or file
            replacements: [{
              from: '<%%= pkg.stagingPath %><%%= pkg.name %>/',                   // string replacement
              to: './'
            }]
          }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= config.dist %>/*',
                        '!<%%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Copies remaining files to places other tasks can use
        copy: {
          dist: {
            files: [{
              expand: true,
              dot: true,
              cwd: '<%%= config.app %>',
              dest: '<%%= config.dist %>',
              src: [
                'images/*',
                'template.html'
              ]
            }]
          }
        },
        compress: {
          main: {
            options: {
              archive: 'builds/<%%= pkg.name %>-build_'+grunt.template.today('ddmmHHMM')+'.zip'
            },
            files: [
                {expand: true, cwd: '<%%= config.dist %>', src: ['**'], dest: '<%%= pkg.name %>/'}, // makes all src relative to cwd
            ]
          }
        },            
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'replace',
        'compress'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
