/*!
 *    /     '      /  /
 *   /__      ___ (  /
 *   \--`-'-|`---\ |
 *    |' _/   ` __/ /
 *    '._  W    ,--'
 *       |_:_._/
 *
 * ~~~~~~~ dotcfg v1.5.14
 *
 * @moment Sunday, April 2, 2017 9:18 PM
 * @commit 4b5b7a08d1e3e474709fb11eaa73f62930ff2cf3
 * @homepage https://github.com/adriancmiranda/dotcfg
 * @author Adrian C. Miranda
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dotcfg", [], factory);
	else if(typeof exports === 'object')
		exports["dotcfg"] = factory();
	else
		root["dotcfg"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* eslint-disable spaced-comment */

/*!
 * Takes a function and returns a new one that will always have a particular context.
 * @param fn: The function whose context will be changed.
 * @param context: The object to which the context (this) of the function should be set.
 * @param ...rest: Prefix arguments.
 */
module.exports = function (fn/*!*/, context/*!*/) {
	var args = Array.prototype.slice.call(arguments, 2);
	var bind = function () {
		return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
	};
	bind.__originalFn__ = bind.__originalFn__ || fn;
	return bind;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return typeof value === 'function';
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return toString.call(value) === '[object Number]';
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return !isNaN(parseFloat(value, 10)) && isFinite(value);
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return toString.call(value) === '[object Object]';
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return value !== Object(value);
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return toString.call(value) === '[object String]';
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return typeof value === 'undefined';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isNumeric = __webpack_require__(3);
var parseNotation = __webpack_require__(19);

var hasBrackets = /\[|\]/;
var parts = /(\[{1}\s{0,1})(.{0,}?\]{0,})(\s{0,1}\]{1})/g;

module.exports = function (path) {
	var notation = parseNotation(path);
	for (var x = 0; x < notation.length; x++) {
		if (hasBrackets.test(notation[x])) {
			notation[x] = notation[x].replace(parts, ',$2').split(',');
			for (var y = 1; y <= notation[x].length; y++) {
				if (isNumeric(notation[x][y])) {
					notation[x][y] = parseInt(notation[x][y], 10);
				}
			}
		}
	}
	return Array.prototype.concat.apply([], notation);
};

module.exports.notation = parseNotation;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isFn = __webpack_require__(1);
var isObject = __webpack_require__(4);

module.exports = function (strategy) {
	return function assign(target) {
		var args = Array.prototype.slice.call(arguments);
		var output = Object(target || {});
		for (var ix = 1; ix < args.length; ix++) {
			var from = args[ix];
			var keys = Object.keys(Object(from));
			for (var iy = 0; iy < keys.length; iy++) {
				var key = keys[iy];
				var outputValue = output[key];
				var sourceValue = from[key];
				var notation = key;
				if (Array.isArray(outputValue) || Array.isArray(sourceValue)) {
					var f = Array.isArray(sourceValue) ? sourceValue.slice() : [];
					var o = Array.isArray(outputValue) ? outputValue.slice() : [];
					output[key] = strategy(f, o, notation, keys);
				} else if (isFn(outputValue) || isFn(sourceValue)) {
					output[key] = strategy(sourceValue, outputValue, notation, keys);
				} else if (isObject(outputValue) || isObject(sourceValue)) {
					output[key] = assign(outputValue, sourceValue);
				} else {
					output[key] = strategy(sourceValue, outputValue, notation, keys);
				}
			}
		}
		return output;
	};
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports.date = __webpack_require__(17);
exports.regexp = __webpack_require__(18);
exports.fn = __webpack_require__(1);
exports.number = __webpack_require__(2);
exports.numeric = __webpack_require__(3);
exports.primitive = __webpack_require__(5);
exports.object = __webpack_require__(4);
exports.string = __webpack_require__(6);
exports.undef = __webpack_require__(7);

exports.obj = exports.object;
exports.str = exports.string;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable spaced-comment */

var parse = __webpack_require__(8);

module.exports = function (scope, notation) {
	var id = 0;
	var keys = parse(notation);
	var total = keys.length;
	while ((scope = scope[keys[id++]]) && id < total) {/*!*/}
	return id < total ? undefined : scope;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (value, target) {
	if (Array.isArray(target)) {
		return target.concat(value);
	}
	return value;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return value;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var proxy = __webpack_require__(0);

module.exports = function (scope, instance, fns) {
	var cache = {};
	var acc = '@';
	for (var id = 0, key; id < fns.length; id++) {
		key = fns[id];
		if (scope[key]) {
			scope[acc + key] = scope[key];
			cache[key] = scope[key];
		}
		scope[key] = proxy(instance[key], instance);
	}
	return function (flush) {
		if (flush) {
			for (var id = 0, key; id < fns.length; id++) {
				key = fns[id];
				if (cache[key]) {
					scope[key] = cache[key];
					delete scope[acc + key];
				} else {
					delete scope[key];
				}
			}
		}
		return scope;
	};
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(8);
var isUndefined = __webpack_require__(7);
var isPrimitive = __webpack_require__(5);
var isNumber = __webpack_require__(2);

module.exports = function (target, path, value, strategy) {
	var id = 0;
	var scope = target;
	var notation = path;
	var keys = parse(notation);
	var total = keys.length - 1;
	var nextNotation;
	while (id < total) {
		notation = keys[id++];
		nextNotation = keys[id];
		if (isNumber(nextNotation)) {
			target[notation] = new Array(parseInt(nextNotation, 10) - 1);
		}
		if (isPrimitive(target[notation])) {
			target[notation] = {};
			target = target[notation];
		} else {
			target = target[notation];
		}
	}
	notation = keys[id];
	if (isUndefined(value)) {
		delete target[notation];
	} else {
		target[notation] = strategy(
			value,
			target[notation],
			notation,
			keys
		);
	}
	return scope;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return toString.call(value) === '[object Date]';
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (value) {
	return toString.call(value) === '[object RegExp]';
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-var */
var isString = __webpack_require__(6);

var dot = /\.(?![^[]*\])/g;
var blank = [];

module.exports = function (path) {
	if (isString(path)) {
		return path.split(dot);
	}
	return Array.isArray(path) ? path : blank;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* global window */
/* eslint-disable spaced-comment, new-cap, comma-dangle */
var is = __webpack_require__(10);
var proxy = __webpack_require__(0);
var read = __webpack_require__(11);
var write = __webpack_require__(15);
var assign = __webpack_require__(9);
var validate = __webpack_require__(14);
var assignStrategyDefault = __webpack_require__(12);
var dotStrategyDefault = __webpack_require__(13);

/*!
 * Public methods.
 */
var fns = 'res exe cfg get set'.split(' ');

/*!
 * Mixing behaviors.
 */
var assignStrategy = assign(assignStrategyDefault);

/*!
 * A global GUID counter for objects.
 */
var guid = 1;

/*!
 * Define a local copy of `DotCfg`.
 * @param namespace: A string containing a qualified name to identify objects from.
 * @param scope: A object that have system-wide relevance.
 * @param strategy: A function that configures the input values.
 */
var DotCfg = function (namespace/*?*/, scope/*?*/, strategy/*?*/) {
	if (!is.primitive(namespace)) {
		strategy = scope;
		scope = namespace;
		namespace = undefined;
	}
	var expose = is.undef(global) ? window : global;
	var self = is.primitive(scope) ? expose : scope;
	var fn = is.fn(strategy) ? strategy : dotStrategyDefault;
	return new DotCfg.fn.init(namespace, self, fn);
};

/*!
 * Create a instance of `DotCfg`.
 * @param namespace: A string containing a qualified name to identify objects from.
 * @param scope: A object that have system-wide relevance.
 * @param strategy: A function that configures the input values.
 */
var init = function (namespace/*?*/, scope/*?*/, strategy/*?*/) {
	if (is.string(namespace)) {
		scope[namespace] = scope[namespace] || Object.create(null);
		scope = scope[namespace];
	}
	this.strategy = strategy;
	this["extends"] = proxy(assign(strategy), this, scope);
	this.namespace = namespace || 'dot' + guid;
	this.scope = validate(scope, this, fns);
	guid++;
	return this.scope();
};

/*!
 * Write/Read/Delete/Update a config with strategy method if needed.
 * @param notation:
 * @param value:
 * @param strategy:
 */
var cfg = function (notation/*?*/, value/*?*/, strategy/*?*/) {
	var hasArg = arguments.length > 1;
	if (!notation) {
		return this.scope(true);
	}
	if (notation === true) {
		var cp = assignStrategy({}, this.scope());
		for (var id = 0, key, acc; id < fns.length; id++) {
			key = fns[id];
			acc = '@' + key;
			if (cp[acc]) {
				cp[key] = cp[acc];
				delete cp[acc];
			} else {
				delete cp[key];
			}
		}
		return cp;
	}
	if (is.primitive(notation)) {
		return hasArg ? this.set(notation, value, strategy) : this.get(notation);
	}
	return this["extends"](notation);
};

/*!
 * Read safely a key containing a function or a simple property.
 * @param notation: A object path.
 * @param ...rest: Arguments for the object.
 */
var res = function (notation/*!*/) {
	var scope = this.scope();
	var part = read(scope, notation);
	var args = Array.prototype.slice.call(arguments, 1);
	return is.fn(part) ? part.apply(scope, args) : part;
};

/*!
 * *** DEPRECATED METHOD ***
 * Read safely a key containing a function or a simple property.
 * @param notation: A object path.
 * @param ...rest: Arguments for the object.
 */
var exe = function (notation/*!*/) {
	if (is.fn(console && console.warn)) {
		console.warn('DotCfg: "exe" method is deprecated, call "res" method instead!');
	}
	return res(notation);
};

/*!
 * Write in scope.
 * @param notation: A object path.
 * @param value: Arguments for the object.
 * @param strategy: Arguments for the object.
 */
var setter = function (notation/*!*/, value/*!*/, strategy/*?*/) {
	var fn = !is.undef(value) && is.fn(strategy) ? strategy : this.strategy;
	return write(this.scope(), notation, value, fn);
};

/*!
 * Read scope notation.
 * @param notation: A object path.
 * @param defaultValue: A fallback value.
 */
var getter = function (notation/*!*/, defaultValue/*?*/) {
	var value = read(this.scope(), notation);
	return is.undef(value) ? defaultValue : value;
};

/*!
 * @public Methods and properties.
 */
DotCfg.prototype = {
	constructor: DotCfg,
	init: init,
	cfg: cfg,
	get: getter,
	set: setter,
	res: res,
	exe: exe
};

/*!
 * Expose `DotCfg` and some static methods.
 * @static strategy: Default notation strategy.
 * @static assign: Default mixing strategy.
 */
DotCfg.fn = DotCfg.prototype;
DotCfg.fn.init.prototype = DotCfg.fn;
DotCfg.strategy = dotStrategyDefault;
DotCfg.assign = assignStrategy;
module.exports = DotCfg;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=dotcfg.js.map
