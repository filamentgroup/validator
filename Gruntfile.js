/*global module:true*/
/*global require:true*/
(function(){
	'use strict';

	module.exports = function(grunt) {

		var pkg = grunt.file.readJSON('package.json');
		var validators = grunt.option('validators');

		if( validators && validators.length ){
			validators = validators.split(' ');
			pkg.validators = validators;
		}

		function getValidatorFiles( names ) {
			var files = [];

			pkg.validators.forEach(function( validator ) {
				names.forEach(function( suffix ) {
					files.push( 'src/patterns/' + validator + '/validator.' + validator + suffix );
				});
			});

			return files;
		}

		// Project configuration.
		grunt.initConfig({
			// Metadata.
			pkg: pkg,
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= pkg.license %> */\n',
			// Task configuration.
			clean: {
				files: ["<%= concat.js.dest %>", "<%= uglify.dist.dest %>"]
			},
			concat: {
				options: {
					banner: '<%= banner %>',
					stripBanners: true
				},
				jsinit: {
					src: ["src/validator.init.js"],
					dest: 'dist/<%= pkg.name %>-init.js'
				},
				jscore: {
					src: (function() {
						// Add new validators to package.json
						// Files: src/patterns/KEY/validator.KEY.[config.js,copy.js,.js]
						var files = ["src/validator.js"];

						files.push.apply( files, getValidatorFiles( ['.js'] ) );

						return files;
					}()),
					dest: 'dist/<%= pkg.name %>.js'
				},
				jsconfig: {
					src: getValidatorFiles( ['.config.js', '.copy.js'] ),
					dest: 'dist/<%= pkg.name %>.config.js'
				},
				js: {
					src: ['<%= concat.jscore.dest %>', '<%= concat.jsinit.dest %>', '<%= concat.jsconfig.dest %>'],
					dest: 'dist/<%= pkg.name %>.core-and-config.js'
				},
				css: {
					src: ['src/validator.css'],
					dest: 'dist/<%= pkg.name %>.css'
				}
			},
			qunit: {
				files: ['test/**/*.html']
			},
			jshint: {
				gruntfile: {
					options: {
						jshintrc: '.jshintrc'
					},
					src: 'Gruntfile.js'
				},
				src: {
					options: {
						jshintrc: 'src/.jshintrc'
					},
					src: ['src/**/*.js']
				},
				test: {
					options: {
						jshintrc: 'test/.jshintrc'
					},
					src: ['test/**/*.js']
				}
			},
			watch: {
				gruntfile: {
					files: '<%= jshint.gruntfile.src %>',
					tasks: ['jshint:gruntfile']
				},
				srcjs: {
					files: '<%= jshint.src.src %>',
					tasks: ['src', 'test']
				},
				srccss: {
					files: '<%= concat.css.src %>',
					tasks: ['src']
				},
				test: {
					files: '<%= jshint.test.src %>',
					tasks: ['test']
				}
			},
			uglify: {
				dist: {
					src: ['<%= concat.js.dest %>'],
					dest: 'dist/<%= pkg.name %>.core-and-config.min.js'
				}
			},
			bytesize: {
				dist: {
					src: [
						'<%= concat.css.dest %>',
						'<%= concat.js.dest %>',
						'<%= uglify.dist.dest %>'
					]
				}
			},
			'gh-pages': {
				options: {},
				src: ['dist/**/*', 'libs/**/*', 'examples/**/*', 'test/**/*']
			}
		});

		require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

		grunt.registerTask('test', [ 'jshint:test', 'qunit' ]);
		grunt.registerTask('src', [ 'jshint', 'concat:css', 'concat:jscore', 'concat:jsinit', 'concat:jsconfig' ]);
		grunt.registerTask('default', [ 'src', 'jshint:test','qunit', 'report' ]);
		grunt.registerTask('report', [ 'concat:js', 'uglify', 'bytesize', 'clean' ]);
		grunt.registerTask('deploy', [ 'default', 'gh-pages' ]);

	};
})();
