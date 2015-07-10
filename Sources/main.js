/*!
	Defines the global LUCID object exposed to the browser.
*/

(function() {
	"use strict";

	var meta = require("./meta");

	meta.defineGlobalOnce("LUCID", function() {
		return {
			meta: meta
		};
	});
}());
