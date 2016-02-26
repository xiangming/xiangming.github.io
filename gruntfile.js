module.exports = function(grunt){
	//项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
	            ' * Site Name: <%= pkg.name %>\n' +
	            ' * Site URI: <%= pkg.URI %>\n' +
	            ' * Description: <%= pkg.description %>\n' +
	            ' * Author: <%= pkg.author %>\n' +
	            ' * Author URI: <%= pkg.authorURI %>\n' +
	            ' * Version: <%= pkg.version %>\n' +
	            ' * © <%= grunt.template.today("yyyy") %> <%= pkg.name%>. All rights reserved.\n' +
	            ' */\n',
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			base: {
				files: {
					'js/base.min.js': [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/bootstrap/dist/js/bootstrap.js',
						'bower_components/wow.js/dist/wow.js',
						'bower_components/jquery-easing/jquery.easing.js'
					]
				}
			},
			common: {
				files: {
					'js/common.min.js': 'js/common.js'
				}
			}
		},
		less: {
			build: {
				files: {
					'css/common.css': 'less/build.less'
				}
			}
		},
		cssmin: {
			options: {
				banner: '<%= banner %>',
				keepSpecialComments: '0'
			},
			base: {
				files: {
					'css/base.min.css': [
						'bower_components/font-awesome/css/font-awesome.css',
						'bower_components/bootstrap/dist/css/bootstrap.css',
						'bower_components/animate-css/animate.css'
					]
				}
			},
			common: {
				files: {
					'css/common.min.css': 'css/common.css'
				}
			}
		},
		copy: {
			gitignore: {
				files: [
					{expand: true, cwd: 'bower_components/gruntfile/', src:['.gitignore'], dest: ''},
				]
			},
			fonts: {
				files: [
					{expand: true, cwd: 'bower_components/font-awesome/fonts/', src:['**'], dest: 'fonts/'},
				]
			}
		},
		watch: {
			uglify: {
				files: ['js/common.js'],
				tasks: ['uglify:common'],
                options: {
                    livereload: true
                }
			},
			less: {
				files: ['less/*.less', 'less/*/*.less'],
				tasks: ['less', 'cssmin:common'],
                options: {
                    livereload: true
                }
			}
		}
	});
	//加载插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	//制定任务
	grunt.registerTask('init',['copy', 'uglify', 'less', 'cssmin', 'watch']);
	grunt.registerTask('default',['uglify', 'less', 'cssmin', 'watch']);
}