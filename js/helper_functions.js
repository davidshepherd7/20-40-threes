"use strict";

var Helpers = Helpers || {};

// Check if value is in array
Helpers.inArray = function (value, array) {
    return array.indexOf(value) !== -1;
};


// Specify default value for an argument
Helpers.defaultFor = function (arg, val) {
    if (typeof arg !== 'undefined') {
        return arg;
    }
    else {
        return val;
    }
};
