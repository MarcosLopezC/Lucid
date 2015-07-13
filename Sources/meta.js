/**
	Defines functions designed to facilitate meta-programming.

	@class meta
	@static
	@namespace LUCID
*/

"use strict";

/**
	Returns a value indicating whether the given value in not null or undefined.

	@method isAssigned
	@param value {any} The value to be checked.
	@return {Boolean} True if `value` is not null or undefined.
 */
var isAssigned = function(value) {
	return typeof value !== "undefined" && value !== null;
};

/**
	Returns the first value that is not null or undefined.
	If none of the values are assigned, then the last value is returned.

	@method getAssigned
	@param ...value {any}
	@return {any}
*/
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

/**
	Parses the given namespace string into an array.

	@private
	@method parseNamespace
	@param namespaceString {String} The namespace to be parsed.
	@return {Array<String>}
*/
var parseNamespace = function(namespaceString) {
	return namespaceString.split(".");
};

/**
	Creates the given namespace structure and executes the constructor to generate the object
	only if it's not already defined.

	@method defineGlobalOnce
	@param namespace {String} The namespace where the global value should be defined.
	@param constructor {Function()} The function that constructs the value.
	@return {any} The value at the given namespace.
*/
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

/**
	Returns a function that returns the value originally passed.

	@method createConstantGetter
	@param value {any} The value that will be returned by the function created.
	@return {Function()} A function that returns the value passed to the builder function.
*/
var createConstantGetter = function(value) {
	return function() {
		return value;
	};
};

var defineProperty = Object.defineProperty;

/**
	Defines a constant property inside the given object.

	@method defineConstant
	@param object {Object} The object where the property will be defined.
	@param key {String} The key (name) of the property.
	@param value {any} The value of the property.
	@return {any} The value of the property.
*/
var defineConstant = function(object, key, value) {
	defineProperty(object, key, {
		value: value,
		writable: false
	});

	return value;
};

/**
	Defines an accessor in the given object.

	@method defineAccessor
	@param object {Object} The object where the accessor will be defined.
	@param key {String} The key (name) of the accessor property.
	@param settings {Object}
	@param settings.get {Function} The function that gets the value.
	@param [settings.set] {Function(any)} The function that sets the value.
*/
var defineAccessor = function(object, key, settings) {
	defineProperty(object, key, {
		get: settings.get,
		set: settings.set
	});
};

/**
	Locks all the properties in the given object whose keys are all in upper case.

	@method lockConstants
	@param object {Object} The object to lock.
	@return {Object} The locked object.
*/
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
