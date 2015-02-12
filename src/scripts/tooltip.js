var version  = require('./utils/version.js');

// By default JS dependency is handled using browserify
// please see 'GULP-TASKS.md#js' for more info
//
// You may need another component:
// run : $ bower install bskyb-core --save
// then add
// var core = require('../../bower_components/bskyb-core/src/scripts/core');
// var event = core.event;

//example function and export
function sum(args){
    var total = 0;
    args.forEach(function(int){
        total += int;
    });
    return total;
}

module.exports = {
    sum: sum,
    version: version
};

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents['tooltip'] = module.exports;