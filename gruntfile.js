var matchDep = require('matchdep');

module.exports = function (grunt) {

	grunt.initConfig({
        ts:{
            default:{
                src:['src**/*.ts'],
                outDir:'build/',
                watch:'src',
                options:{
                    baseDir:'src/',
                    sourceRoot:'src/',
                    module:'commonjs',
                    target:'es5'
                }
            }   
        },
		karma:{
			unit:{
				options:{
					frameworks: ['jasmine'],
				    files: [
				        'build/*.js'
				    ],
					reporters: ['progress','html'],
				    port: 9000,
				    colors: true,
				    logLevel: 'INFO',
				    autoWatch: true,
				    browsers: ['PhantomJS'],
				    singleRun: false,
				    concurrency: Infinity,
				    htmlReporter:{
				        outputDir:'test-results',
				        namedFiles:true,
				        reportName:'index'
				    }
				}
			}
		},
		connect:{
			'test-results':{
				options:{
					port:8000,
					hostname:'localhost',
					base:'test-results',
					keepalive:true,
					open:true,
					livereload:10000
				}
			}
		},
		watch:{
			'test-results':{
				files:[
					'test-results/index.html'
				],
				options:{
					spawn:false,
					livereload:10000
				}
			}
		},
		concurrent:{
			target:{
				options:{
					logConcurrentOutput: true
				},
				tasks:[
                    'ts',
					'karma',
					'connect',
					'watch'
				]
			}
		}
	});

	matchDep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default',['concurrent:target']);

};