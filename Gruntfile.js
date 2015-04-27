
module.exports = function(grunt) {

    /****************************************
     *
     * PROJECT CONFIGURATION
     *
     ****************************************/

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        opt: {
            header: '/*! <%= pkg.title %> Package - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
            footer: '',
            nl: grunt.util.linefeed
        },

        /********************
         * CONCAT FILES
         ********************/
        concat: {
            options: {
                separator: grunt.util.linefeed
            },

            packages: {
                src: [
                    'src/core/PUIElement.js',
                    'src/core/PUIElementContainer.js',

                    'src/panels/PUIPanel.js',
                    'src/panels/PUIPanelComponent.js',
                    'src/panels/PUIPanelComponentGroup.js',
                    'src/panels/PUINavigation.js',

                    'src/core/PUIMain.js'
                ],
                dest: 'target/temp/packages.js'
            },

            main: {
                options: {
                    banner: '<%= opt.header %><%= opt.nl %>'+
                    'var <%= pkg.title %> = (function(){' + '<%= opt.nl %>'+
                    'var pkgVersion = "v<%= pkg.version %>";' + '<%= opt.nl %>',
                    footer: '<%= opt.nl %>'+
                    'return <%= pkg.title %>Package;}());'
                },
                src: [
                    'target/temp/packages.js',
                    'target/<%= pkg.title %>Package.js'
                ],
                dest: 'target/<%= pkg.name %>-<%= pkg.version %>.js'
            }

        },

        /********************
         * MINIFY FILES
         ********************/
        uglify: {

            main: {
                options: { banner: '<%= opt.header %><%= opt.nl %>' },
                files: {'target/<%= pkg.name %>-<%= pkg.version %>.min.js': ['target/<%= pkg.name %>-<%= pkg.version %>.js']}
            }

        },

        /********************
         * CLEAN
         ********************/
        clean: {

            target : ['target'],
            build  : ['build'],
            deploy : ['public/<%= pkg.version %>'],
            all    : ['target','build','public/<%= pkg.version %>']

        },

        /********************
         * COPY
         ********************/
        copy: {

            main: {
                files: [
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        src: ['target/<%= pkg.name %>*'],
                        dest: 'build/<%= pkg.version %>/'
                    }
                ]
            },

            deploy: {
                files: [
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        opt: {from:'<%= pkg.name %>',to:'<%= pkg.name %>-latest'},
                        dest: 'public/', src: ['build/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js'],
                        rename: function(dest, src) {return dest + src.replace(/[0-9]/g,'').replace(/-\.\./,'').replace(this.opt.from,this.opt.to);}
                    },
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        src: ['build/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js'],
                        dest: 'public/<%= pkg.version %>/'
                    }
                ]
            }

        }

    });

    /****************************************
     *
     * LOAD PLUGINS
     *
     ****************************************/

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    /****************************************
     *
     * REGISTER TASKS
     *
     ****************************************/

    // External tasks
    grunt.loadTasks('tasks');

    // Full tasks
    grunt.registerTask('build', ['clean:target', 'create_package', 'concat:packages', 'concat:main', 'uglify:main', 'copy:main', 'clean:target']);
    grunt.registerTask('deploy', ['clean:deploy', 'build', 'copy:deploy']);

    // Default task
    grunt.registerTask('default', ['build']);

};
