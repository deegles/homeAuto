#! /usr/bin/env node
"use strict";
require("./logger");

var exec = require('child_process').exec,
    child;

console.log("Setting up dependencies...");
// Install blinky dependencies first
child = exec('npm install', {cwd: '/apps/blinky/src'},
    function (error, stdout, stderr) {
        console.log('npm install stdout: ' + stdout);
        console.log('npm install stderr: ' + stderr);
        if (error !== null) {
            console.log('npm install error: ' + error);
            exit(1);
        } else {
            console.log("Done.");
            exit(0);
        }
    });