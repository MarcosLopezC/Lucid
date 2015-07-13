/*!
	Defines functions designed to facilitate meta-programming.
*/

"use strict";

// Returns a value indicating whether the given value has been a value that is not null or undefined.
var isAssigned = function(value) {
	return typeof value !== "undefined" && value !== null;
};

// Returns the first passed value to be assigned a value other than null or undefined.
// If none of the values are assigned, then the last value is returned.
var getAssigned = function() {
	var value;
	var i, length;

	for (i = 0, length = arguments.length; i < length; i += 1) {
		value = arguments[i];

		if (isAssigned(value)) {
			return value;
		}
	}

	return value;
};

// Parses the given namespace string into an array.
var parseNamespace = function(namespaceString) {
	return namespaceString.split(".");
};

// Creates the given namespace structure and executes the constructor to generate the object
// only if it's not already defined.
var defineGlobalOnce = function(namespace, constructor) {
	var hierarchy = parseNamespace(namespace);
	var leafName = hierarchy.pop();
	var context = window;

	if (!leafName) {
		throw new Error("Invalid namespace or object name.");
	}

	hierarchy.forEach(function(nodeName) {
		var node = context[nodeName] || {};

		if (node !== window) {
			context[nodeName] = node;
		}

		context = node;
	});

	if (!isAssigned(context[leafName])) {
		context[leafName] = constructor();
	}

	return context[leafName];
};

// Returns a function which returns the value passed.
var createConstantGetter = function(value) {
	return function() {
		return value;
	};
};

var defineProperty = Object.defineProperty;

// Defines a constant value in the given object.
var defineConstant = function(object, key, value) {
	defineProperty(object, key, {
		value: value,
		writable: false
	});

	return value;
};

// Defines an accessor in the given object.
var defineAccessor = function(object, key, settings) {
	defineProperty(object, key, {
		get: settings.get,
		set: settings.set
	});
};

// Sets the writable property to false to all the properties within the given object that have
// a constant name (all upper case).
var lockConstants = function(object) {
	Object.keys(object).forEach(function(key) {
		if (key === key.toUpperCase()) {
			defineConstant(object, key, object[key]);
		}
	});

	return object;
};

module.exports = {
	isAssigned:           isAssigned,
	getAssigned:          getAssigned,
	defineGlobalOnce:     defineGlobalOnce,
	createConstantGetter: createConstantGetter,
	defineConstant:       defineConstant,
	defineAccessor:       defineAccessor,
	lockConstants:        lockConstants
};
