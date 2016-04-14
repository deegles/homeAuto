#! /usr/bin/env node
"use strict";
require("./logger");
var fs = require('fs');
var util = require('util');
var config = require('./config');
var pidPath = config.pidPath;

var spawn = require('child_process').spawn;

var blinky = spawn("node", ["blinky.js"], {cwd: "/apps/blinky/src/"});

blinky.stdout.on('data', function(data) {
    console.log(data);
});

blinky.stderr.on('data', function(data) {
    console.log("ERROR: " + data);
});

console.log("Started blinky with PID: " + blinky.pid);
console.log("Saving...");
fs.writeFile(pidPath, blinky.pid, function(err) {
    if(err) {
        console.log("Error saving PID to " + pidPath + ": " + err);
        process.exit(1);
    }
    console.log("Done.");
    process.exit(0);
});