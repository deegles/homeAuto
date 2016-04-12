"use strict";
var fs = require('fs');
var util = require('util');
var path = require('path');
var config = require('./config');
var log_path = config.logDir;
var log_name = new Date().toISOString();
var log_stdout = process.stdout;
var log_file;

try {
    var log_file_name = util.format("%s/%s.log", log_path, log_name);
    ensureDirectoryExistence(log_file_name);
    log_file = fs.createWriteStream(log_file_name, {flags: 'w'}); //__dirname + '/debug.log'
} catch (e){
    process.stderr.write("Exception creating log file write stream: " + util.inspect(e));
}

console.log = function(d) {
    if(log_file){
        log_file.write(Date.now().toISOString() + ": " + util.format(d) + '\n');
    }
    log_stdout.write(util.format(d) + '\n');
};

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (directoryExists(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function directoryExists(path) {
    try {
        return fs.statSync(path).isDirectory();
    }
    catch (err) {
        return false;
    }
}