"use strict";

var Helpers = Helpers || {};

// Specify default value for an argument
Helpers.defaultFor = function(arg, val) {
  if (typeof arg !== 'undefined') {
    return arg;
  } else {
    return val;
  }
};
