"use strict";

var ValueGenerators = ValueGenerators || {};


ValueGenerators.semiRandomThreesValue = function() {
  var value;
  var r = Math.random();

  // choose a value which is more likely to be 1 if there are
  // lots of 2s and vice versa.
  var oneCount = this.grid.countTilesWithValue(1);
  var twoCount = this.grid.countTilesWithValue(2);
  var maxPOneTwo = 0.6;

  var pOne = maxPOneTwo *
    (Math.abs(oneCount - twoCount) /
      Math.max(oneCount, twoCount));

  if (r < pOne) {
    value = 1;
  } else if (r < maxPOneTwo) {
    value = 2;
  } else if (r < 0.9) {
    value = 3;
  } else {
    value = 6;
  }

  return value;
};

// Generate a value for a new tile. By default choose a value completely at
// random.
ValueGenerators.randomThreesValue = function() {

  var value;
  var r = Math.random();

  if (r < 0.3) {
    value = 1;
  } else if (r < 0.6) {
    value = 2;
  } else if (r < 0.9) {
    value = 3;
  } else {
    value = 6;
  }

  return value;
};
