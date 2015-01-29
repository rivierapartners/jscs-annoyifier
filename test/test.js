var jscs = require('jscs/lib/cli');
var chai = require('chai');
var sinon = require('sinon');
var reporterModule = require('../index')
var notifier = require('node-notifier');
var expect = chai.expect;
var program = require('commander');

var yo = function() {

program
    .version(require('../package.json').version)
    .usage('[options] <file ...>')
    .option('-c, --config [path]', 'configuration file path')
    .option('-e, --esnext', 'attempts to parse esnext code (currently es6)')
    .option('--es3', 'validates code as es3')
    .option('-s, --esprima <path>', 'attempts to use a custom version of Esprima')
    .option('-n, --no-colors', 'clean output without colors')
    .option('-p, --preset <preset>', 'preset config')
    .option('-v, --verbose', 'adds rule names to the error output')
    .option('-m, --max-errors <number>', 'maximum number of errors to report')
    .option('-f, --error-filter <path>', 'a module to filter errors')
    .option('-r, --reporter <reporter>', 'error reporter, console - default, text, checkstyle, junit, inline')
    .option('', 'Also accepts relative or absolute path to custom reporter')
    .option('', 'For instance:')
    .option('', '\t  ../some-dir/my-reporter.js\t(relative path with extension)')
    .option('', '\t  ../some-dir/my-reporter\t(relative path without extension)')
    .option('', '\t  /path/to/my-reporter.js\t(absolute path with extension)')
    .option('', '\t  /path/to/my-reporter\t\t(absolute path without extension)')
    .parse();

cli(program);
            

};
var exec = require('child_process').exec;

describe("call the passed in notifier", function() {
    var mockNotifier = null;

    beforeEach(function() {
        mockNotifier = sinon.mock(notifier);
        reporterModule.__setNotifier(mockNotifier);
    });

    it("should find the correct number of errors for the correct file", function() {
        mockNotifier.expects("notify").withExactArgs({
            title: 'jshint errors',
            message:  './test/fixtures/fixture.js : 5 errors.'
        });
        exec('jscs test/fixtures/fixture.js --preset=google --reporter=text', function(error, stdout, stderr) {
            if(error) {
                console.log(error);
                process.exit();
            }
            else {
                console.log(stdout);
            }
        });
        mockNotifier.verify();
    });
});
