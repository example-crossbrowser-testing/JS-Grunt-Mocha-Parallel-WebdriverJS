'use strict';
var os = require('os');
var path = require('path');

module.exports = function (grunt) {
    // configure tasks
    grunt.initConfig({
        mocha_parallel: {
            options: {
                args: function(suiteName) {
                    return [];
                },
                env: function(suiteName) {
                    process.env.BROWSER = grunt.option('browser');
                    process.env.VERSION = grunt.option('version');
                    process.env.PLATFORM = grunt.option('platform');
                    return process.env;
                },
                report: function(suite, code, stdout, stderr) {
                    if (stdout.length) {
                      process.stdout.write(stdout);
                    }
                    if (stderr.length) {
                      process.stderr.write(stderr);
                    }
                },
                done: function(success, results) {
                },
                mocha: path.join('node_modules', '.bin', 'mocha') + (/win32/.test(os.platform()) ? '.cmd' : ''),
                //this is the default concurrency, change as needed.
                concurrency: os.cpus().length * 1.5
            }
        },

        parallel: {
            assets: {
                options: {
                    grunt: true
                },
                tasks: ['run_windows10_chrome_56','run_windows10_firefox_51']
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-mocha-parallel');
    grunt.loadNpmTasks('grunt-parallel');
    grunt.registerTask('Windows10_chrome_56', function(n) {
      grunt.option('browser', 'chrome');
      grunt.option('version', 56);
      grunt.option('platform', "Windows 10");
    });
    grunt.registerTask('Windows10_firefox_51', function(n) {
      grunt.option('browser', 'firefox');
      grunt.option('version', 51);
      grunt.option('platform', "Windows 10");
    });
    // register tasks
    grunt.registerTask('default', ['parallel']);
    grunt.registerTask('run_windows10_chrome_56', ['Windows10_chrome_56', 'mocha_parallel']);
    grunt.registerTask('run_windows10_firefox_51', ['Windows10_firefox_51', 'mocha_parallel']);
};
