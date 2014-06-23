"use strict";

var ValueGenerators = ValueGenerators || {};

ValueGenerators.random2048Value = function() {
    var r = Math.random();

    if(r < 0.9) {
        return 2;
    }
    else {
        return 4;
    }
};


ValueGenerators.semiRandomThreesValue = function() {
  var value;
  var r = Math.random();

  // choose a value which is more likely to be 1 if there are
  // lots of 2s and vice versa.
  var n1 = this.grid.countTilesWithValue(1);
  var n2 = this.grid.countTilesWithValue(2);

  var pmax = 0.6;
  var pOne = ValueGenerators.
        semiRandomThreesFunctionGenerator(0.0, pmax, 4)(n1, n2);

  if (r < pOne) {
    value = 1;
  } else if (r < pmax) { // pTwo = pmax - pOne
    value = 2;
  } else if (r < 0.9) {
    value = 3;
  } else {
    value = 6;
  }

  return value;
};

// Generate a function to generate values depending on the difference
// between the number of 1s and 2s.
ValueGenerators.semiRandomThreesFunctionGenerator =
    function (p1min, p1max, nrange) {
        return function (n1, n2) {
            // if outside the range then return the corresponding maximum
            if(Math.abs(n1 - n2) >= nrange) {

                // lots of 1s, low prob of generating another 1
                if(n1 > n2) {
                    return p1min;
                }

                // lots of 2s, high prob of generating a 1
                else if(n1 < n2) {
                    return p1max;
                }
                else {
                    throw "Should never get here";
                }
            }

            // otherwise use a linear function of n1minusn2
            else {
                var k = (p1min + p1max)/(2*nrange);
                return (n2 - n1) * k + (p1min + p1max)/2;
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
