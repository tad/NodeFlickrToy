/**
 * Created with JetBrains WebStorm.
 * User: TDonaghe
 * Date: 4/27/13
 * Time: 1:13 PM
 * To change this template use File | Settings | File Templates.
 */
/*global desc, task, jake, fail, complete, directory */

(function() {
    "use strict";

    desc("Build and test");
    task("default", ["lint", "test"]);

    desc("Lint everything!");
    task("lint", function() {
        var lint = require("./build/lint/lint_runner.js");
        var javascriptFiles = new jake.FileList();
        javascriptFiles.include("**/*.js");
        javascriptFiles.exclude("node_modules");
        var passed = lint.validateFileList(javascriptFiles.toArray(), nodeLintOptions(), {});
        if(!passed)
            fail("Lint failed");
    });

    desc("Test everything!");
    task("test", ["testServer"]);

    desc("Test server code");
    task("testServer", function() {
       var testFiles = new jake.FileList();
        testFiles.include("**/_*_test.js");
        testFiles.exclude("node_modules");
        var reporter = require("nodeunit").reporters["default"];
        reporter.run(testFiles.toArray(), null, function(failures) {
            if(failures) fail("Tests failed");
            complete();
        });
    }, {async: true});


    function nodeLintOptions() {
        return {
            bitwise:true,
            curly:false,
            eqeqeq:true,
            forin:true,
            immed:true,
            latedef:true,
            newcap:true,
            noarg:true,
            noempty:true,
            nonew:true,
            regexp:true,
            undef:true,
            strict:true,
            trailing:true,
            node:true
        };
    }

})();