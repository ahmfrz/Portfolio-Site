module.exports = function(grunt){
    /* Load grunt tasks plugin makes sure that all required tasks
    are loaded without the need of 'load npm tasks' */
    require('load-grunt-tasks')(grunt);

    // Read the configuration file
    var config = grunt.file.readYAML("GruntConfig.yaml");

    grunt.initConfig({
        // Concatinate javascript files
        concat:{
            dist:{
                src:[config.jsSrcDir + "*"],
                dest:config.jsDistDir + 'built.js'
            }
        },

        // Minify css files
        cssmin:{
            target:{
                files:[{
                    src:[config.cssSrcDir + "*"],
                    dest: config.cssDistDir + 'main.min.css',
                    ext: '.min.css'
                }]
            }
        },

        // Watch file changes
        watch:{
            files:[config.jsSrcDir + "*", config.cssSrcDir + "*", "Index.html"],
            tasks:['concat', 'cssmin'],
            options:{
                livereload: true
            }
        }
    });

    // Register all tasks
    grunt.registerTask('default', 'concat', 'cssmin', 'watch');
}