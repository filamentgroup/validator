/*global module:true*/
(function(){
	'use strict';

	module.exports = function(grunt) {

		var pkg = grunt.file.readJSON('validator.jquery.json');

		function getValidatorPathPrefix( name ) {
			return 'src/patterns/' + name + '/validator.' + name;
		}

		// Project configuration.
		grunt.initConfig({
			// Metadata.
			pkg: pkg,
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
			// Task configuration.
			clean: {
				files: ["<%= concat.js.dest %>", "<%= uglify.dist.dest %>"]
			},
			concat: {
				options: {
					banner: '<%= banner %>',
					stripBanners: true
				},
				jscore: {
					src: (function() {
						// Add new validators to validator.jquery.json
						// Files: src/patterns/KEY/validator.KEY.[config.js,copy.js,.js]
						var files = [];

						pkg.validators.forEach(function( validator ) {
							files.push( getValidatorPathPrefix( validator ) + '.js' );
						});

						files.unshift( 'src/validator.js' );
						files.push( 'src/validator.init.js' );

						return files;
					}()),
					dest: 'dist/<%= pkg.name %>.js'
				},
				jsconfig: {
					src: (function() {
						var files = [];

						pkg.validators.forEach(function( validator ) {
							var prefix = getValidatorPathPrefix( validator );
							files.push( prefix + '.config.js',
								prefix + '.copy.js' );
						});

						return files;
					}()),
					dest: 'dist/<%= pkg.name %>.config.js'
				},
				js: {
					src: ['<%= concat.jscore.dest %>', '<%= concat.jsconfig.dest %>'],
					dest: 'dist/<%= pkg.name %>.both-core-and-config.js'
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
			uglify: {
				dist: {
					src: ['<%= concat.js.dest %>'],
					dest: 'dist/<%= pkg.name %>.min.js'
				}
			},
			bytesize: {
				dist: {
					src: [
						'<%= concat.css.dest %>',
						'<%= concat.js.dest %>',
						'<%= uglify.dist.src %>'
					]
				}
			},
			'gh-pages': {
				options: {},
				src: ['dist/**/*', 'libs/**/*', 'examples/**/*', 'test/**/*']
			}
		});

		require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

		grunt.registerTask('default', [ 'jshint', 'concat', 'qunit', 'report' ]);
		grunt.registerTask('report', [ 'uglify', 'bytesize', 'clean' ]);
		grunt.registerTask('deploy', [ 'default', 'gh-pages' ]);

	};
})();