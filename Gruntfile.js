"use strict";

module.exports = function(grunt) {
	var fileBanner = "/*! Lucid Library - v<%= packageInfo.version %> */";

	grunt.config.init({
		packageInfo: grunt.file.readJSON("package.json"),
		browserify: {
			release: {
				files: {
					"Build/lucid.js": "Sources/main.js"
				},
				options: {
					banner: fileBanner,
					browserifyOptions: {
						debug: false
					}
				}
			},
			debug: {
				files: {
					"Build/lucid.debug.js": "Sources/main.js"
				},
				options: {
					browserifyOptions: {
						debug: true
					}
				}
			}
		},
		jshint: {
			all: [
				"Sources/**/*.js"
			],
			options: {
				browser: true,
				node: true
			}
		},
		uglify: {
			build: {
				files: {
					"Build/lucid.min.js": ["Build/lucid.js"]
				}
			},
			options: {
				banner: fileBanner + "\n"
			}
		},
		watch: {
			files: [
				"Sources/**/*.js"
			],
			tasks: [
				"quickBuild"
			]
		},
		yuidoc: {
			name: '<%= packageInfo.name %>',
			description: '<%= packageInfo.description %>',
			version: '<%= packageInfo.version %>',
			url: '<%= packageInfo.homepage %>',
			options: {
				paths: 'Sources',
				outdir: 'Documentation'
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");

	grunt.registerTask("quickBuild", [
		"browserify"
	]);

	grunt.registerTask("build", [
		"jshint",
		"quickBuild",
		"uglify",
		"yuidoc"
	]);

	grunt.registerTask("default", [
		"build"
	]);
};
