"use strict";


/* global ValueGenerators */
/* global _ */
/* global QUnit */

/* global GameManager */
/* global DummyKeyboardInputManager */
/* global DummyHTMLActuator */
/* global LocalStorageManager */

// Helper function to test the properties of a tile value
var generalGeneratorTest = function(assert, vs) {
    function isPositive(v) {
        return v > 0;
    }
    function isInt(v) {
        return Math.floor(v) === v;
    }

    assert.ok(_.all(_.map(vs, isPositive)), "values positive");
    assert.ok(_.all(_.map(vs, isInt)), "integer value");
    assert.ok(_.contains(vs, 1), "At least one 1 generated");
    assert.ok(_.contains(vs, 2), "At least one 2 generated");
};


QUnit.test("random threes value generation", function( assert ) {
    // generate list of values
    var vs = [];
    _.times(100,
            function() {
                vs.push(ValueGenerators.randomThreesValue());
            });

    generalGeneratorTest(assert, vs);
});


QUnit.test("semi-random threes value generation", function( assert ) {
    var gm = new GameManager(4, 4,
                             new DummyKeyboardInputManager,
                             new DummyHTMLActuator,
                             new LocalStorageManager,
                             ValueGenerators.semiRandomThreesValue);

    // generate list of values
    var vs = [];
    _.times(100, function() {vs.push(gm.generateValue());});

    generalGeneratorTest(assert, vs);
});

QUnit.test("semi-random threes probability function", function( assert ) {

    // Create a probability function
    var p1min = 0.0, p1max = 0.6, nrange = 4;
    var f = ValueGenerators.
        semiRandomThreesFunctionGenerator(p1min, p1max, nrange);

    assert.deepEqual(f(100), p1min, "Extreme minimum value ok");
    assert.deepEqual(f(nrange), p1min, "Minimum value ok");
    assert.ok((f(nrange-1) - p1min) < 0.2, "Near min value ok");


    assert.deepEqual(f(-100), p1max, "Extreme maximum value ok");
    assert.deepEqual(f(-nrange), p1max, "Maximum value ok");
    assert.ok((f(-nrange+1) - p1max) < 0.2, "Near max value ok");



    assert.ok(f(0) < p1max, "Intermediate value < max");
    assert.ok(f(0) > p1min, "Intermediate value > min");

});
