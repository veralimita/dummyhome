// Gruntfile.js
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'tmp/app.css': 'styles/app.less'
				}
			}
		},
		cssmin: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'public/app.min.css': 'tmp/app.css'
				}
			}
		},
		watch: {
			files: ['styles/*.less'],
			tasks: ['less', 'cssmin']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['less', 'cssmin']);
};