"use strict";

var Helpers = Helpers || {};

// Check if value is in array
Helpers.inArray = function (value, array) {
    return array.indexOf(value) !== -1;
};
