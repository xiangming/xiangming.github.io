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
		// babel: {
		//     options: {
		//     	// sourceMap: true,
		//     	presets: ['env']
		//     },
		//     dist: {
		//     	files: {
		//         	// 'js/pull.min.js': 'js/pull.js'
		//     	}
		//     }
		// },
		eslint: {
			options: {
				config: '.eslintrc',
				reset: true
			},
	        app: ['js/*.js', '!js/*.min.js', '!js/*-bak*', '!js/loader.js']
	    },
		uglify: {
			vendor: {
				options: {
					compress: {
						drop_console: true
					}
				},
				files: {
					'js/vendor.min.js': [
						'node_modules/jquery/dist/jquery.js',
						'node_modules/bootstrap/dist/js/bootstrap.js',
						'node_modules/wow.js/dist/wow.js',
						// 'node_modules/jquery-easing/jquery.easing.js'
					]
				}
			},
			app: {
				options: {
					compress: {
						drop_console: true // for debug
					},
					banner: '<%= banner %>'
				},
				files: {
					'js/app.min.js': 'js/app.js'
				}
			}
		},
		less: {
			options: {
				banner: '<%= banner %>'
			},
			app: {
				files: {
					'css/app.min.css': 'less/build.less'
				}
			}
		},
		autoprefixer:{
            options:{
                browserslist:['chrome','ie','firefox'],
                map:true
            },
            single_file: {
                src: 'css/app.min.css',//需要加前缀的css文件
                dest: 'css/app.min.css'//grunt处理后生成的css文件，如果文件夹中没有该文件，则自动创建
            },
        },
		cssmin: {
			vendor: {
				options: {
					// banner: '<%= banner %>',
					keepSpecialComments: '0'
				},
				files: {
					'css/vendor.min.css': [
						'node_modules/bootstrap/dist/css/bootstrap.css',
						'node_modules/animate.css/animate.css'
					]
				}
			},
			app: {
				options: {
					banner: '<%= banner %>',
					keepSpecialComments: '0'
				},
				files: {
					'css/app.min.css': 'css/app.min.css'
				}
			}
		},
  //       clean: {
		// 	options: {
		// 	    'force': true
		// 	},
		// 	release: ["release", "js/*.min.map"]
		// },
		// copy: {
		// 	free: {
		// 		files: [
		// 			{
		// 				expand: true,
		// 				src:[
		// 					'account/**/*',
		// 					'action/**/*',
		// 					'css/**/*.min.css',
		// 					'css/fonts/**/*',
		// 					'dist/**/*',
		// 					'fonts/**/*',
		// 					'images/**/*',
		// 					'img/**/*',
		// 					'includes/**/*',
		// 					'inc/**/*',
		// 					'js/**/*min.js',
		// 					'js/**/*min.css',
		// 					'languages/**/*',
		// 					'pages/**/*',
		// 					'templates/**/*',
		// 					'modules/**/*',
		// 					'settings/**/*',
		// 					'widgets/**/*',
		// 					'widget/**/*',
		// 					'screenshot.*',
		// 					'*.php',
		// 					'*.css',
		// 					'!**/cache/*',
		// 					'!**/*-own*', // 不录入own自用文件
		// 					'!**/*-bak*', // 不录入bak文件
		// 				],
		// 				dest: 'release/<%= pkg.name %>/'
		// 			},
		// 		]
		// 	}
		// },
		watch: {
			uglify: {
				files: ['js/*.js', '!js/*.min.js'],
				tasks: ['newer:uglify'], // newer使uglify只作用于有变化的文件
                options: {
                    livereload: true
                }
			},
			less: {
				files: ['less/**/*.less'],
				tasks: ['less', 'autoprefixer', 'cssmin:app'],
                options: {
                    livereload: true
                }
			}
		}
	});

	//加载插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-babel');

	//制定任务
	grunt.registerTask('default', ['eslint', 'uglify', 'less', 'autoprefixer', 'cssmin', 'watch']);
}