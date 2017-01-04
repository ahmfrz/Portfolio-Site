module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);

    var config = grunt.file.readYAML("GruntConfig.yaml");

    grunt.initConfig({
        concat:{
            dist:{
                src:[config.jsSrcDir + "*"],
                dest:config.jsDistDir + 'built.js'
            }
        }
    });

    grunt.registerTask('default', 'concat');
}