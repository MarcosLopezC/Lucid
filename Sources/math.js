/**
	Defines useful mathematical functions and constants.

	@class math
	@static
	@namespace LUCID
*/

"use strict";

var meta = require("./meta");

/**
	Represents the ratio of a circle's circumference to its radius.

	@property TAU
	@type Number
	@final
*/
var TAU = Math.PI * 2;

/**
	Represents the ratio of a circle's circumference to its diameter.

	@property PI
	@type Number
	@final
*/
var PI = Math.PI;

/**
	Represents a half of PI's value.

	@property HALF_PI
	@type Number
	@final
*/
var HALF_PI = Math.PI / 2;

/**
	Returns the smallest value passed.

	@method getMin
	@param ...value {Number}
	@return {Number}
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

/**
	Returns the largest value passed.

	@method getMax
	@param ...value {Number}
	@return {Number}
*/
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

/**
	Returns the remainder resulting from the Euclidean division of the dividend with the divisor.

	@method modulus
	@param dividend {Number}
	@param divisor {Number}
	@return {Number}
*/
var modulus = function(dividend, divisor) {
	return ((dividend % divisor) + divisor) % divisor;
};

/**
	Returns a value indicating whether the given value is in the range (min, max).

	@method isBetween
	@param value {Number} The value to be checked.
	@param min {Number} The lower bound.
	@param max {Number} The upper bound.
	@return {Boolean}
*/
var isBetween = function(value, min, max) {
	return value > min && value < max;
};

/**
	Returns a value indicating whether the given value is in the range [min, max].

	@method isBetweenInclusive
	@param value {Number} The value to be checked.
	@param min {Number} The lower bound.
	@param max {Number} The upper bound.
	@return {Boolean}
*/
var isBetweenInclusive = function(value, min, max) {
	return value >= min && value <= max;
};

/**
	Returns a value that is constrained to the range [min, max].
	If the given value within the range, then that value is returned.
	Otherwise, the value of the limit that is closest to the value is returned.

	@method constrain
	@param value {Number} The value to be constrained.
	@param min {Number} The lower bound.
	@param min {Number} The upper bound.
	@return {Number}
*/
var constrain = function(value, min, max) {
	return getMin(getMax(value, min), max);
};

/**
	Returns a value in the range [0, 1) based on where the given value in on the range [min, max).

	@method normalize
	@param value {Number} The value to be normalized.
	@param min {Number} The lower bound.
	@param min {Number} The upper bound.
	@return {Number}
*/
var normalize = function(value, min, max) {
	return (value - min) / (max - min);
};

/**
	Returns the linear interpolation of the given normalized value over the range [min, max).

	@method linearInterpolation
	@param value {Number} The value to interpolate.
	@param min {Number} The lower bound.
	@param min {Number} The upper bound.
	@return {Number}
*/
var linearInterpolation = function(value, min, max) {
	return (1 - value) * min + value * max;
};

/**
	Maps the given value from one range into another.

	@method map
	@param value {Number} The value to be mapped.
	@param fromMin {Number} The original lower bound.
	@param fromMax {Number} The original upper bound.
	@param toMin {Number} The target lower bound.
	@param toMax {Number} The target upper bound.
	@return {Number}
*/
var map = function(value, fromMin, fromMax, toMin, toMax) {
	var normal = normalize(value, fromMin, fromMax);
	return linearInterpolation(normal, toMin, toMax);
};

/**
	Returns the value of a random angle, in radians.

	@method randomAngle
	@return {Number}
*/
var randomAngle = function() {
	return Math.random() * TAU;
};

/**
	Returns a random number in the range [min, max).

	@method randomNumber
	@param min {Number} The lowest possible value.
	@param max {Number} The highest possible value (not inclusive).
	@return {Number}
*/
var randomNumber = function(min, max) {
	return linearInterpolation(Math.random(), min, max);
};

/**
	Return a random integer in the range [min, max].

	@method randomInteger
	@param min {Number} The lowest possible value.
	@param max {Number} The highest possible value (inclusive).
	@return {Number}
*/
var randomInteger = function(min, max) {
	return randomNumber(min, max + 1) | 0;
};

/**
	Returns the given radian angle as a degree.

	@method toDegrees
	@param radians {Number} The value to convert to a degree.
	@return {Number}
*/
var toDegrees = function(radians) {
	return (radians * 360) / TAU;
};

/**
	Returns the given degree angle as a radian.

	@param degrees {Number} The value to convert to a radian.
	@return {Number}
*/
var toRadians = function(degrees) {
	return (degrees * TAU) / 360;
};

module.exports = meta.lockConstants({
	TAU:                 TAU,
	PI:                  PI,
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
