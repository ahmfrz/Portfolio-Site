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

        // Clear out the images directory if it exists
        clean: {
          dev: {
            src: [config.imgDistDir],
        },
    },

    // Generate the images directory if it is missing
    mkdir: {
      dev: {
        options: {
          create: [config.imgDistDir]
      },
  },
},

        // Create versions of images to serve different sized devices
        responsive_images:{
            dev:{
                options:{
                    sizes:[{
                        width: 1024,
                        suffix: '_large_2x',
                        quality: 40
                    },
                    {
                        width: 1024,
                        suffix: '_large_1x',
                        quality: 25
                    },
                    {
                        width: 800,
                        suffix: '_large',
                        quality: 30
                    },
                    {
                        width: 600,
                        suffix: '_mid',
                        quality: 30
                    },
                    {
                        // Create cropped images for small displays
                        width: 350,
                        height: 350,
                        aspectRatio:false,
                        gravity:'East',
                        suffix: '_small_cropped',
                        quality:50
                    }]
                },
                files:[{
                    expand: true,
                    src:["*.{jpeg,jpg,png,gif}"],
                    cwd:config.imgSrcDir,
                    dest:config.imgDistDir
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
    grunt.registerTask('default', 'concat', 'cssmin','clean', 'mkdir', 'responsive_images', 'watch');
}