console.log("start");
var async = require("async");
// button is attaced to pin 17, led to 18
var GPIO = require('onoff').Gpio;
//led = new GPIO(14, 'out'),
var button = new GPIO(4, 'in', 'both');

var led1 = new GPIO(14, 'out');
var led2 = new GPIO(3, 'out');
var led3 = new GPIO(27, 'out');
var led4 = new GPIO(2, 'out');

var looping = 0;

// define the callback function
function light(err, state) {
    //console.log("state: " + require("util").inspect(state === 1));
    // check the state of the button
    // 1 == pressed, 0 == not pressed
    if(state == 1) {
        looping += 1;
        async.series([
                // turn LED on
                function(callback){setTimeout(function () {
                    led1.writeSync(1);
                    callback();
                }, 100)},
                function(callback){setTimeout(function () {
                    led1.writeSync(0);callback();
                }, 300)},
                function(callback){setTimeout(function () {
                    led2.writeSync(1);callback();
                }, 100)},
                function(callback){setTimeout(function () {
                    led2.writeSync(0);callback();
                }, 200)},
                function(callback){setTimeout(function () {
                    led3.writeSync(1);callback();
                }, 100)},
                function(callback){setTimeout(function () {
                    led3.writeSync(0);callback();
                }, 300)},
                function(callback){setTimeout(function () {
                    led4.writeSync(1);callback();
                }, 100)},
                function(callback){setTimeout(function () {
                    led4.writeSync(0);callback();
                }, 200)}],
            function(err, results) {
                setTimeout(function () {
                    light("", 1);
                }, 500)
            })
    }
}

// pass the callback function to the
// as the first argument to watch()
button.watch(light);