#! /usr/bin/env node
"use strict";
require("./logger");
var psTree;
var fs = require('fs');
var util = require('util');
var config = require('./config');
var pidPath = config.pidPath;

var exec = require('child_process').exec,
    child;

// Install script dependencies first
child = exec("npm install",
    function (error, stdout, stderr) {
        console.log('npm install stdout: ' + stdout);
        console.log('npm install stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            psTree = require('ps-tree');
            stopExistingProcess();
        }
    });

function stopExistingProcess() {
    console.log("Stopping running processes...");
    fs.readFile(pidPath, 'utf8', function (err, data) {
        if (err) {
            if(err["code"] === "ENOENT"){
                console.log("Blinky not running...");
                process.exit(0); // do nothing
            }
            console.log("Error reading running pid: " + err);
            process.exit(1);
            return;
        }

        console.log("Current PID: " + data);
        var pid = parseInt(data);

        console.log("Deleting pid file...");
        try{
            fs.unlink(pidPath);
        } catch (e) {
            console.log("Error deleting pid file!");
            process.exit(1);
        }
        console.log("Done.");

        console.log("Trying to kill " + pid + "...");
        kill(pid, "SIGKILL", function() {
            console.log("Done.");
            process.exit(0);
        });
    });
}


// From: http://krasimirtsonev.com/blog/article/Nodejs-managing-child-processes-starting-stopping-exec-spawn#killing-stopping-the-command
var kill = function (pid, signal, callback) {
    signal   = signal || 'SIGKILL';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) {
                    console.log("Exception killing pid " + tpid + " child of " + pid + ":" + ex);
                    process.exit(1);
                }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) {
            console.log("Exception killing pid " + pid + ":" + ex);
            process.exit(1);
        }
        callback();
    }
};