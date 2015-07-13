/**
 *  Defines useful mathematical functions and constants.
 *
 *  @class math
 *  @namespace LUCID
 */

"use strict";

var meta = require("./meta");

/**
 *  Represents the ratio of a circle's circumference to its radius.
 *
 *  @property TAU
 *  @type Number
 *  @final
 */
var TAU = Math.PI * 2;

/**
 *  Represents a half of PI's value.
 *  
 *  @property HALF_PI
 *  @type Number
 *  @final
 */
var HALF_PI = Math.PI / 2;

// Returns the smallest value passed.
/**
 *  Returns the smallest value passed.
 *  
 *  @method getMin
 *  @param ...value {Number}
 */
var getMin = function() {
	var min = arguments[0];
	var i, length;

	for (i = 1, length = arguments.length; i < length; i += 1) {
		if (arguments[i] < min) {
			min = arguments[i];
		}
	}

	return min;
};

// Returns the largest value passed.
var getMax = function() {
	var max = arguments[0];
	var i, length;

	for (i = 1, length = arguments.length; i < length; i += 1) {
		if (arguments[i] > max) {
			max = arguments[i];
		}
	}

	return max;
};

// Returns the remainder resulting from the Euclidean division of the dividend with the divisor.
var modulus = function(dividend, divisor) {
	return ((dividend % divisor) + divisor) % divisor;
};

// Returns a value indicating whether the given value is in the range (min, max).
var isBetween = function(value, min, max) {
	return value > min && value < max;
};

// Returns a value indicating whether the given value is in the range [min, max].
var isBetweenInclusive = function(value, min, max) {
	return value >= min && value <= max;
};

// Returns a value that is constrained to the range [min, max].
var constrain = function(value, min, max) {
	return getMin(getMax(value, min), max);
};

// Returns a value in the range [0, 1) based on where the given value in on the range [min, max).
var normalize = function(value, min, max) {
	return (value - min) / (max - min);
};

// Returns the linear interpolation of the given normalized value over the range [min, max).
var linearInterpolation = function(value, min, max) {
	return (1 - value) * min + value * max;
};

// Returns a value in the range [toMin, toMax) that is proportional to how the given value
// is to [fromMin, fromMax).
var map = function(value, fromMin, fromMax, toMin, toMax) {
	var normal = normalize(value, fromMin, fromMax);
	return linearInterpolation(normal, toMin, toMax);
};

// Returns the value of a random angle, in radians.
var randomAngle = function() {
	return Math.random() * TAU;
};

// Returns a random number in the range [min, max).
var randomNumber = function(min, max) {
	return linearInterpolation(Math.random(), min, max);
};

// Returns a random integer in the range [min, max].
var randomInteger = function(min, max) {
	return randomNumber(min, max + 1) | 0;
};

// Returns the given radian angle as a degree.
var toDegrees = function(radians) {
	return (radians * 360) / TAU;
};

/**
 *  ## toRadians
 *
 *  Returns the given degree angle as a radian.
 *
 *  @param {Number} degrees The degree value to be converted.
 *  @return {Number}
 */
var toRadians = function(degrees) {
	return (degrees * TAU) / 360;
};

module.exports = meta.lockConstants({
	TAU:                 TAU,
	HALF_PI:             HALF_PI,
	getMin:              getMin,
	getMax:              getMax,
	modulus:             modulus,
	isBetween:           isBetween,
	isBetweenInclusive:  isBetweenInclusive,
	constrain:           constrain,
	normalize:           normalize,
	linearInterpolation: linearInterpolation,
	map:                 map,
	randomAngle:         randomAngle,
	randomNumber:        randomNumber,
	randomInteger:       randomInteger,
	toDegrees:           toDegrees,
	toRadians:           toRadians
});
