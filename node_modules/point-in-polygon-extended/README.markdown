# point-in-polygon-extended


[![Build Status](https://travis-ci.org/iominh/point-in-polygon-extended.svg)](https://travis-ci.org/iominh/point-in-polygon-extended) [![Coverage Status](https://coveralls.io/repos/iominh/point-in-polygon-extended/badge.svg)](https://coveralls.io/r/iominh/point-in-polygon-extended)

Determine if a point is inside of a polygon.

This is a fork of James Halliday's [point-in-polygon](https://github.com/substack/point-in-polygon) and includes
alternative algorithms beyond ray casting because the original library does not include points on boundaries
([see issue2](https://github.com/substack/point-in-polygon/issues/2)). Another library called
[robust-point-in-polygon](https://www.npmjs.com/package/robust-point-in-polygon) solves this problem but still
has some difficulty for complex polygons with regards to performance and accuracy.

Point-in-polygon-extended allows a user to switch between the aforementioned algorithms or other ones, such
as the [winding number test](http://geomalgorithms.com/a03-_inclusion.html). This library also includes a testing
suite to compare the different algorithms for different test cases.

# example


```js
var pointInPoly = require('point-in-polygon-extended');
var pointInPolyRaycast = pointInPoly.pointInPolyRaycast;
var pointInPolyWindingNumber = pointInPoly.pointInPolyWindingNumber;

var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];

console.dir([
    pointInPolyRaycast([ 1.5, 1.5 ], polygon),
    pointInPolyRaycast([ 4.9, 1.2 ], polygon),
    pointInPolyRaycast([ 1.8, 1.1 ], polygon)
]);
// output: [ true, false, true ]

console.dir([
    pointInPolyWindingNumber([ 1.5, 1.5 ], polygon),
    pointInPolyWindingNumber([ 4.9, 1.2 ], polygon),
    pointInPolyWindingNumber([ 1.8, 1.1 ], polygon)
]);
// output: [ true, false, true ]
```

# methods

## Ray-casting
```js
/**
 * Returns whether a point is in a polygon using ray casting. This still returns
 * false if a point is on the boundary.
 *
 * Based on Point Inclusion in Polygon Test (PNPOLY) by W. Randolph Franklin:
 * http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
 *
 * @param point {Array} should be a 2-item array of coordinates
 * @param polygon {Array} should be an array of 2-item arrays of coordinates.
 * @returns {boolean} true if point is inside or false if not
 */
function pointInPolyRaycast(point, polygon)
```

## Winding number
```js
/**
 * Returns whether a point is in a polygon using a winding number test
 *
 * Algorithm by Dan Sunday: http://geomalgorithms.com/a03-_inclusion.html
 *
 * @param point {Array} should be a 2-item array of coordinates
 * @param polygon {Array} should be an array of 2-item arrays of coordinates.
 * @return {boolean} true if inside, false if outside
 */
 function pointInPolyWindingNumber(point, polygon)
 ```

# install

    npm install point-in-polygon-extended

# credit

Thank you to the following people and projects:

- James Halliday / substack for his [point-in-polygon](https://github.com/substack/point-in-polygon)
- Mikola Lysenko for his [robust-point-in-polygon](https://github.com/mikolalysenko/robust-point-in-polygon)
- Brendan Kenny for his [libtess.js](https://github.com/brendankenny/libtess.js). I borrowed a lot of his testing layout
(gulp, travis, coveralls, mocha, etc)
- Dan Sunday for his [winding number algorithm](http://geomalgorithms.com/a03-_inclusion.html)
- W. Randolph Franklin for his [ray casting algorithm](http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html)

# other options / research


- [Java polygon-contains-point](https://github.com/sromku/polygon-contains-point/tree/master/Polygon/src/com/sromku/polygon)
- [Stackoverflow point-in-polygon answer](http://stackoverflow.com/questions/217578/point-in-polygon-aka-hit-test)

# tips + tricks

## Debugging

If you have Webstorm or IntelliJ, set a breakpoint and create a Mocha run configuration with a TDD user interface.

Alternatively, you can run from the root directory

```javascript
mocha --ui tdd
```

## Gulp tasks

To build, run mocha tests, and measure code coverage
```
gulp build
gulp test
gulp coverage
```