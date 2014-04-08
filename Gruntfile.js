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
				dist: {
					src: [
						'src/validator.js',
						'src/patterns/birthday/validator.birthday.config.js',
						'src/patterns/birthday/validator.birthday.copy.js',
						'src/patterns/birthday/validator.birthday.js',
						'src/patterns/ccexpiration/validator.ccexpiration.config.js',
						'src/patterns/ccexpiration/validator.ccexpiration.copy.js',
						'src/patterns/ccexpiration/validator.ccexpiration.js',
						'src/patterns/credit/validator.credit.config.js',
						'src/patterns/credit/validator.credit.copy.js',
						'src/patterns/credit/validator.credit.js',
						'src/patterns/email/validator.email.config.js',
						'src/patterns/email/validator.email.copy.js',
						'src/patterns/email/validator.email.js',
						'src/patterns/numeric/validator.numeric.config.js',
						'src/patterns/numeric/validator.numeric.copy.js',
						'src/patterns/numeric/validator.numeric.js',
						// 'src/patterns/password/validator.password.config.js',
						// 'src/patterns/password/validator.password.copy.js',
						// 'src/patterns/password/validator.password.js',
						'src/validator.init.js'
					],
					dest: 'dist/<%= pkg.name %>.js'
				}
			},
			uglify: {
				options: {
					banner: '<%= banner %>'
				},
				dist: {
					src: ['<%= concat.dist.src %>'],
					dest: 'dist/<%= pkg.name %>.min.js'
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
			}
		});

		// These plugins provide necessary tasks.
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-qunit');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-watch');

		// Default task.
		grunt.registerTask('default', [ 'jshint', 'concat', 'uglify', 'qunit', 'clean' ]);

	};
})();