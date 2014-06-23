"use strict";

var ValueGenerators = ValueGenerators || {};


ValueGenerators.semiRandomThreesValue = function() {
  var value;
  var r = Math.random();

  // choose a value which is more likely to be 1 if there are
  // lots of 2s and vice versa.
  var oneCount = this.grid.countTilesWithValue(1);
  var twoCount = this.grid.countTilesWithValue(2);

  var pmax = 0.6;
  var pOne = ValueGenerators.
        semiRandomThreesFunctionGenerator(0.0, pmax, 4)(twoCount - oneCount);

  if (r < pOne) {
    value = 1;
  } else if (r < pmax) {
    value = 2;
  } else if (r < 0.9) {
    value = 3;
  } else {
    value = 6;
  }

  return value;
};

// Generate a function
ValueGenerators.semiRandomThreesFunctionGenerator =
    function (p1min, p1max, nrange) {
        return function (n1minusn2) {
            // if outside the range then return the corresponding maximum
            if(Math.abs(n1minusn2) >= nrange) {

                // lots of 1s, low prob of generating another 1
                if(n1minusn2 > 0) {
                    return p1min;
                }

                // lots of 2s, high prob of generating a 1
                else if(n1minusn2 < 0) {
                    return p1max;
                }
                else {
                    throw "Should never get here";
                }
            }

            // otherwise use a linear function of n1minusn2
            else {
                var k = (p1min + p1max)/(2*nrange);
                return -n1minusn2 * k + (p1min + p1max)/2;
            }
        };
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
