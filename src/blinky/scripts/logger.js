"use strict";
var fs = require('fs');
var util = require('util');
var config = require('./config');
var log_path = config.logDir;
var log_name = new Date().toISOString();
var log_stdout = process.stdout;
var log_file;

try {
    log_file = fs.createWriteStream(util.format("%s/%s.log", log_path, log_name), {flags: 'w'}); //__dirname + '/debug.log'
} catch (e){
    log_stdout.write("Exception creating log file write stream: " + util.inspect(e));
}

var date = new Date();

console.log = function(d) {
    if(log_file){
        log_file.write(date.now().toISOString() + ": " + util.format(d) + '\n');
    }
    log_stdout.write(util.format(d) + '\n');
};