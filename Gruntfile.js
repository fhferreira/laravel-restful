"use strict";

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Project configuration.
    grunt.initConfig({
        // grunt-contrib.clean => build directory
        clean: {
            dist: ['public/js', 'public/css', 'public/templates']
        }, 
        // config for lint
        jshint: {
            all: [
                'Gruntfile.js', 
                'frontend/scripts/**/*.js'
            ],
            options: {
                globalstrict: true,
                browser: true,
                indent: 4,
                newcap: false,
                sub: true,
                loopfunc: true, // make func inside loop
                globals: {
                    console: true,
                    module: true,
                    require: true, 
                    $: true,
                    _: true,
                    jQuery: true
                }
            }
        },
        // grunt-contrib.watch => any changes made, make sure its linted
        watch: {
            //bower_components: {
            //    files: ["bower_components/**/*"],
            //    tasks: ['copy:bower_components']
            //},
            public: {
                // run jshint if theres any changes in the scripts
                files: ["public/**/*"],
                tasks: ['copy:public']
            },
            js: {
                // run jshint if theres any changes in the scripts
                files: ["<%=jshint.all%>"],
                tasks: ['jshint']
            },
            scripts: {
                // run jshint if theres any changes in the scripts
                files: ["frontend/scripts/**/*"],
                tasks: ['copy:scripts']
            },
            styles: {
                // rebuild css if theres any sass changes
                files: ['frontend/styles/**/*.less'],
                tasks: ['less:prod']
            }
        },
        copy: {
            bower_components: {
                files: [
                    {src:"bower_components/**", dest: "public/js/"}
                ]
            },
            scripts: {
                files: [
                    {expand: true, cwd: "frontend/scripts/", src:"**", dest: "public/js/"}
                ]
            },
        },
        less: {
            prod: {
                options: {
                    paths: ["frontend/styles"],
                    yuicompress: true
                },
                files: {
                    "public/css/style.css": "frontend/styles/style.less"
                } 
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./public/js",
                    mainConfigFile: './public/js/main.js',
                    //dir: 'public/js',
                    optimize: 'uglify2',
                    uglify2: {
                       //Example of a specialized config. If you are fine
                       //with the default options, no need to specify
                       //any of these properties.
                        output: {
                            beautify: true
                        },
                        compress: {
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: true,
                        mangle: false
                    },
                    name: 'main',
                    out: './public/js/main.min.js'
                }
            }
        }
    });

    // Build tasks
    grunt.registerTask('run', ['jshint', 'clean', 'copy', 'less:prod', 'watch']);
    grunt.registerTask('deploy', ['jshint', 'clean', 'copy', 'less:prod', 'requirejs']);
};

