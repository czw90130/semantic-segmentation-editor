/* jshint node: true */
/* global suite, test */
'use strict';

var chai = require('chai');
var assert = chai.assert;
var pointInPoly = require('../src/index.js');

/**
 * Basic tests of the API using the different APIs
 */
var simpleRectangle = [
	[ 1, 1 ],
	[ 1, 2 ],
	[ 2, 2 ],
	[ 2, 1 ]
];
var pt1 = [1.5, 1.5];
var pt2 = [4.9, 1.2];
var pt3 = [1.8, 1.1];
var pt4 = [1.5, 1.5];
var pt5 = [1, 2];
var pt6 = [100000, 10000];

function simpleRectangleTest (algorithm) {
	var test1 = algorithm(pt1, simpleRectangle);
	var test2 = algorithm(pt2, simpleRectangle);
	var test3 = algorithm(pt3, simpleRectangle);
	assert.strictEqual(test1, true, pt1 + ' should be inside ' + simpleRectangle);
	assert.strictEqual(test2, false, pt2 + ' should be outside ' + simpleRectangle);
	assert.strictEqual(test3, true, pt1 + ' point should be inside ' + simpleRectangle);
}

function simpleRectangleTestWithBoundary (algorithm) {
	var test1 = algorithm(pt4, simpleRectangle);
	var test2 = algorithm(pt5, simpleRectangle);
	var test3 = algorithm(pt6, simpleRectangle);
	assert.strictEqual(test1, true, pt4 + ' should be inside ' + simpleRectangle);
	assert.strictEqual(test2, true, pt5 + ' should be inside ' + simpleRectangle);
	assert.strictEqual(test3, false, pt6 + ' point should be outside ' + simpleRectangle);
}

function runTests(algorithm) {
	test('simple rectangle ', function () {
		simpleRectangleTest(algorithm);
	});
	test('simple rectangle with boundary test', function () {
		simpleRectangleTestWithBoundary(algorithm);
	});
}

suite('Ray casting point in polygon tests', function () {
	runTests(pointInPoly.pointInPolyRaycast);
});

suite('Winding number point in polygon tests', function () {
	runTests(pointInPoly.pointInPolyWindingNumber);
});