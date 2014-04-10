/*global module:true*/
(function(){
	'use strict';

	module.exports = function(grunt) {

		// Project configuration.
		grunt.initConfig({
			// Metadata.
			pkg: grunt.file.readJSON('validator.jquery.json'),
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
			// Task configuration.
			clean: {
				files: []
			},
			concat: {
				options: {
					banner: '<%= banner %>',
					stripBanners: true
				},
				js: {
					src: (function() {
						var files = [],
							// Add new validators here:
							// Files: src/patterns/KEY/validator.KEY.[config.js,copy.js,.js]
							validators = [
								'birthday',
								'ccexpiration',
								'credit',
								'email',
								'numeric',
								'password',
								'passwordconfirm',
								'phone',
								'required',
								'zip'
							];

						validators.forEach(function( validator ) {
							var prefix = 'src/patterns/' + validator + '/validator.' + validator;
							files.push( prefix + '.config.js', prefix + '.copy.js', prefix + '.js' );
						});

						files.unshift( 'src/validator.js' );
						files.push( 'src/validator.init.js' );

						return files;
					}()),
					dest: 'dist/<%= pkg.name %>.js'
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
				src: {
					files: '<%= jshint.src.src %>',
					tasks: ['jshint:src', 'qunit']
				},
				test: {
					files: '<%= jshint.test.src %>',
					tasks: ['jshint:test', 'qunit']
				}
			},
			bytesize: {
				dist: {
					src: [
						'dist/<%= pkg.name %>.css',
						'dist/<%= pkg.name %>.js'
					]
				}
			},
			'gh-pages': {
				options: {},
				src: ['dist/**/*', 'libs/**/*', 'examples/**/*', 'test/**/*']
			}
		});

		require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

		grunt.registerTask('default', [ 'jshint', 'concat', 'qunit', 'clean', 'bytesize' ]);
		grunt.registerTask('deploy', [ 'default', 'gh-pages' ]);

	};
})();