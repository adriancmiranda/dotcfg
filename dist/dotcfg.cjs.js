/*!
 * 
 * ~~~~ dotcfg v1.7.6
 * 
 * @commit 1f8f008e657a28e422d3f2951023116f7ab04dd7
 * @moment Tuesday, April 3, 2018 5:46 PM
 * @homepage https://github.com/adriancmiranda/dotcfg
 * @author Adrian C. Miranda
 * @license (c) 2016-2021 Adrian C. Miranda
 */
'use strict';

// environment
var inNode = typeof window === 'undefined';
var env = inNode ? global : window;

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function array(value) {
	if (value == null) { return false; }
	return value.constructor === Array;
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function string(value) {
	return typeof value === 'string' || value instanceof String;
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function arraylike(value) {
	return array(value) || string(value) || (
		(!!value && typeof value === 'object' && typeof value.length === 'number') &&
		(value.length === 0 || (value.length > 0 && (value.length - 1) in value))
	);
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function number(value) {
	return typeof value === 'number' || value instanceof Number;
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function int(value) {
	return number(value) && value === value && value % 1 === 0;
}

/**
 * The `intOf()` function parses a string argument and returns an integer of the
 * specified radix (the base in mathematical numeral systems).
 *
 * @function
 * @memberof to
 *
 * @param {Number|String|Object} value - The value to parse.
 * If the string argument is not a string, then it is converted to a string
 * (using the ToString abstract operation).
 * Leading whitespace in the string argument is ignored.
 *
 * @param {any} radix - An integer between 2 and 36 that represents
 * the radix (the base in mathematical numeral systems) of the above mentioned string.
 * Specify 10 for the decimal numeral system commonly used by humans. Always specify
 * this parameter to eliminate reader confusion and to guarantee predictable behavior.
 * Different implementations produce different results when a radix is not specified,
 * usually defaulting the value to 10.
 *
 * @returns {Number} An integer number parsed from the given string.
 * If the first character cannot be converted to a number, 0 is returned.
 *
 * min: -2147483647
 * max: 2147483647
 */
function intOf(value, radix) {
	value = (radix == null ? value : parseInt(value, radix));
	return int(value) ? value : 0 | value;
}

/* eslint-disable no-nested-ternary */

/**
 *
 * @function
 * @memberof utility
 * @param {Number} n - index
 * @param {Number} a - divident
 * @param {Number} b - divisor
 * @returns {Number}
 */
function mod(n, a, b) {
	n = intOf(n);
	a = intOf(a);
	b = intOf(b);
	var rem;
	if (a < 0 || b < 0) {
		var places = (b - a);
		rem = (n - a) % (places + 1);
		rem = rem < 0 ? (rem + (places + 1)) : rem === 0 ? 0 : rem;
		return rem - (places - b);
	}
	if (n === b) { return n; }
	if (n === b + 1) { return a; }
	if (n === a - 1) { return b; }
	rem = n % (b || 1);
	rem = rem < a ? (rem + b) : rem === 0 ? 0 : rem;
	return rem;
}

/**
 *
 * @function
 * @memberof utility
 * @param {arraylike} value
 * @param {int} startIndex
 * @param {int} endIndex
 * @returns {Array}
 */
function slice(list, startIndex, endIndex) {
	var range = [];
	var size = arraylike(list) && list.length;
	if (size) {
		var start = mod(startIndex, 0, size + 1);
		if (number(endIndex)) {
			size = mod(endIndex, 0, size - 1);
		}
		if (start < size) {
			if (string(list)) {
				range = '';
				for (var c = start; c < size; c += 1) {
					range += list[c];
				}
				return range;
			}
			for (var i = size - 1; i > start - 1; i -= 1) {
				range[i - start] = list[i];
			}
		}
	}
	return range;
}

/**
 *
 * @function
 * @memberof is
 * @param {Function} expect
 * @param {any} value
 * @returns {Boolean}
 */
function a(expected, value) {
	if (expected == null || value == null) { return value === expected; }
	if (value.constructor === expected) { return true; }
	if (value.constructor === undefined) { return expected === Object; }
	return expected === Function && (
		value.constructor.name === 'GeneratorFunction' ||
		value.constructor.name === 'AsyncFunction'
	);
}

/**
 *
 * @function
 * @memberof is
 * @param {Function|Array.<Function>} expected
 * @param {any} value
 * @returns {Boolean}
 */
function instanceOf(expected, value) {
	if (expected == null) { return expected === value; }
	if (expected.constructor === Array && expected.length > 0) {
		for (var i = expected.length - 1; i > -1; i -= 1) {
			var ctor = expected[i];
			if (ctor === Number) { return a(ctor, value); }
			if (typeof ctor === 'function' && value instanceof ctor) { return true; }
		}
	}
	if (expected === Number) { return a(expected, value); }
	return typeof expected === 'function' && value instanceof expected;
}

// prototypes
var ObjectProto = Object.prototype;

// built-in method(s)
var objectHasOwnProperty = ObjectProto.hasOwnProperty;

/**
 *
 * @function
 * @memberof has
 * @param {Object|Function} context
 * @param {any} key
 * @returns {Boolean}
 */
function ownProperty(context, key) {
	if (context == null) { return false; }
	return objectHasOwnProperty.call(context, key);
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function callable(value) {
	return typeof value === 'function';
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function primitive(value) {
	if (value == null) { return true; }
	if (callable(value.valueOf)) { value = value.valueOf(); }
	if (callable(value) || typeof value === 'object') {
		return false;
	}
	return true;
}

/**
 *
 * @function
 * @memberof is
 * @param {any}
 * @returns {Boolean}
 */
function exotic(value) {
	return primitive(value) === false;
}

/**
 *
 * @param {Function} cmd - .
 * @param {any} context - .
 * @returns {any}
 */
function apply(cmd, context, args, blindly) {
	try {
		var $ = arraylike(args) ? args : [];
		switch ($.length) {
			case 0: return cmd.call(context);
			case 1: return cmd.call(context, $[0]);
			case 2: return cmd.call(context, $[0], $[1]);
			case 3: return cmd.call(context, $[0], $[1], $[2]);
			case 4: return cmd.call(context, $[0], $[1], $[2], $[3]);
			case 5: return cmd.call(context, $[0], $[1], $[2], $[3], $[4]);
			case 6: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5]);
			case 7: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5], $[6]);
			case 8: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5], $[6], $[7]);
			case 9: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5], $[6], $[7], $[8]);
			default: return cmd.apply(context, $);
		}
	} catch (err) {
		if (blindly) { return err; }
		throw err;
	}
}

/**
 *
 * @function
 * @memberof has
 * @param {String|Array} context
 * @param {any} value
 * @returns {Boolean}
 */
function ownValue(context, value) {
	if (arraylike(context) === false) { return false; }
	for (var id = context.length - 1; id > -1; id -= 1) {
		if (value === context[id]) {
			return true;
		}
	}
	return false;
}

/**
 *
 * @function
 * @memberof is
 * @param {Function|Array.<Function>} expected
 * @param {any} value
 * @returns {Boolean}
 */
function any(expected, value) {
	if (expected == null) { return expected === value; }
	if (expected.constructor === Array && expected.length > 0) {
		for (var i = expected.length - 1; i > -1; i -= 1) {
			if (a(expected[i], value)) { return true; }
		}
	}
	return a(expected, value);
}

/**
 *
 * @param {Function|Array.<Function>} expected
 * @param {any} value
 * @returns {Boolean}
 */
function as(expected, value) {
	var args = slice(arguments, 2);
	if (callable(value) && (expected === Function || ownValue(expected, Function)) === false) {
		value = apply(value, args[0], args, true);
	}
	return any(expected, value) ? value : args[0];
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function object(value) {
	if (value == null) { return false; }
	if (value.constructor === Object) { return true; }
	return value.constructor === undefined;
}

/**
 *
 * @function
 * @memberof is
 * @param {any}
 * @returns {Boolean}
 */
function undef(value) {
	return value === undefined;
}

function assignDefault(value, target) {
	if (array(target)) {
		return target.concat(value);
	}
	return value;
}

function dotDefault(value) {
	return value;
}

/*!
 * Takes a function and returns a new one that will always have a particular context.
 * @param fn: The function whose context will be changed.
 * @param context: The object to which the context (this) of the function should be set.
 * @param ...rest: Prefix arguments.
 */
function proxy(fn, context) {
	var args = slice(arguments, 2);
	var bind = function () {
		return apply(fn, context, args.concat(slice(arguments)));
	};
	bind.__originalFn__ = bind.__originalFn__ || fn;
	return bind;
}

/* eslint-disable no-restricted-syntax */

/**
 *
 * @function
 * @memberof utility
 * @param {Object} context
 * @param {Boolean} getNum
 * @returns {Array}
 */
function keys(object, getEnum) {
	if (object == null) { return []; }
	if (Object.keys && !getEnum) {
		return Object.keys(object);
	}
	var properties = [];
	for (var key in object) {
		if (getEnum || ownProperty(object, key)) {
			properties[properties.length] = key;
		}
	}
	return properties;
}

function assign (strategy) {
	var notation = '';
	return function assign(target) {
		var args = slice(arguments);
		var output = target == null ? {} : target;
		for (var ix = 1; ix < args.length; ix += 1) {
			var from = args[ix];
			var keyList = keys(from);
			for (var iy = 0; iy < keyList.length; iy += 1) {
				var key = keyList[iy];
				var outputValue = output[key];
				var sourceValue = from[key];
				if (array(outputValue) || array(sourceValue)) {
					var f = slice(sourceValue);
					var o = slice(outputValue);
					output[key] = strategy(f, o, (notation + "." + key), keyList);
				} else if (callable(outputValue) || callable(sourceValue)) {
					output[key] = strategy(sourceValue, outputValue, (notation + "." + key), keyList);
				} else if (object(outputValue) || object(sourceValue)) {
					var cacheNotation = notation;
					notation = (cacheNotation ? (cacheNotation + ".") : '') + key;
					output[key] = assign(outputValue, sourceValue);
					notation = cacheNotation;
				} else {
					output[key] = strategy(sourceValue, outputValue, (notation + "." + key), keyList);
				}
			}
		}
		return output;
	};
}

/**
 * Removes a property from an object; if no more references to the same property
 * are held, it is eventually released automatically.
 * @param {Object} object
 * @param {String} prop
 */
function deletePropertyAt(object, prop) {
	if (object == null) { return object; }
	var value = object[prop];
	delete object[prop];
	return value;
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function bool(value) {
	return value === true || value === false || value instanceof Boolean;
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function nan(value) {
	var isnum = number(value);
	return isnum === false || (isnum && value !== value);
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function infinity(value) {
	return number(value) && (value - 1) === value;
}

/**
 *
 * @function
 * @memberof is
 * @param {any} value
 * @returns {Boolean}
 */
function numeric(value) {
	if (value == null) { return false; }
	if (bool(value)) { return true; }
	try {
		var test = parseFloat(value);
		return (nan(test) || infinity(test) || arraylike(test)) === false;
	} catch (err) {
		return false;
	}
}

// pattern(s)
var reHasBrackets = /\[|\]/;
var reStartWithBracket = /^\[/;
var reParts = /(\[{1}\s{0,1})(.{0,}?\]{0,})(\s{0,1}\]{1})/g;
var reDot = /\.(?![^[]*\])/g;

function parse(path) {
	var notation = parse.notation(path);
	for (var x = 0; x < notation.length; x += 1) {
		if (reHasBrackets.test(notation[x])) {
			if (reStartWithBracket.test(notation[x])) {
				notation[x] = [notation[x].replace(reParts, '$2')];
			} else {
				notation[x] = notation[x].replace(reParts, ',$2').split(',');
			}
			for (var y = 0; y < notation[x].length; y += 1) {
				if (numeric(notation[x][y])) {
					notation[x][y] = parseInt(notation[x][y], 10);
				}
			}
		}
	}
	return apply(Array.prototype.concat, [], notation);
}

parse.notation = function (path) {
	if (string(path)) {
		return path.split(reDot);
	}
	return array(path) ? path : [];
};

/* eslint-disable no-plusplus */

function write(target, path, value, strategy) {
	var id = 0;
	var notation = path;
	var nextNotation;
	var scope = target;
	var keys = parse(notation);
	var total = keys.length - 1;
	while (id < total) {
		notation = keys[id++];
		nextNotation = keys[id];
		if (number(nextNotation)) {
			var size = parseInt(nextNotation, 10);
			target[notation] = size ? new Array(size - 1) : [];
		} else if (primitive(target[notation])) {
			target[notation] = {};
		}
		target = target[notation];
	}
	notation = keys[id];
	if (undef(value)) {
		delete target[notation];
	} else {
		target[notation] = strategy(value, target[notation], notation, keys);
	}
	return scope;
}

/* eslint-disable no-restricted-syntax */

function normalize(hash, strategy, recursive) {
	hash = as(Object, hash, {});
	strategy = as(Function, strategy, dotDefault);
	recursive = as(Boolean, recursive, true);
	for (var key in hash) {
		if (ownProperty(hash, key)) {
			if (recursive && object(hash[key])) {
				normalize(hash[key], strategy, recursive);
			} else {
				write(hash, key, deletePropertyAt(hash, key), strategy);
			}
		}
	}
	return hash;
}

function read(scope, notation) {
	var id = 0;
	var keys = parse(notation);
	var total = keys.length;
	for (; id < total; id += 1) {
		if (scope) {
			var key = keys[id];
			scope = scope[key];
		}
	}
	return id < total ? undefined : scope;
}

function resolve(scope, path, args, blindly) {
	var part = read(scope, path);
	if (callable(part)) {
		return apply(part, scope, args, blindly);
	}
	return part;
}

function resolver(scope, scopeBlindly) {
	return function (path, blindly) {
		blindly = undef(blindly) ? scopeBlindly : blindly;
		return resolve(scope, path, slice(arguments, 1), blindly);
	};
}

/* eslint-disable no-restricted-syntax */

/**
 * A global GUID counter for objects.
 */
var guid = 0;

/**
 * Mixing behaviors.
 */
var assignStrategy = assign(assignDefault);

/**
 * Create a instance of `DotCfg`.
 * @param namespace: A string containing a qualified name to identify objects from.
 * @param scope: A object that have system-wide relevance.
 * @param strategy: A function that configures the input values.
 */
function DotCfg(namespace, scope, strategy) {
	if (instanceOf(DotCfg, this)) {
		if (exotic(namespace)) {
			strategy = scope;
			scope = namespace;
			namespace = undefined;
		}
		if (primitive(scope)) {
			scope = env;
		}
		if (string(namespace)) {
			scope[namespace] = scope[namespace] || {};
			scope = scope[namespace];
		}
		this.strategy = as(Function, strategy, dotDefault);
		this.scope = normalize(scope, this.strategy, false);
		this.extends = proxy(assign(this.strategy), this, this.scope);
		this.namespace = as(String, namespace, ("dot" + (guid += 1)));
		return this;
	}
	return new DotCfg(namespace, scope, strategy);
}

/**
 * Public methods and properties.
 */
DotCfg.prototype = {
	constructor: DotCfg,

	/**
	 *
	 * @param recursive:
	 * @returns DotCfg
	 */
	normalize: function normalize$1(recursive) {
		normalize(this.scope, this.strategy, recursive);
		return this;
	},

	/**
	 * Read safely a key containing a function or a simple property.
	 * @param notation: A object path.
	 * @param ...rest: Arguments for the object.
	 * @returns any
	 */
	resolve: function resolve$1(notation) {
		return resolve(this.scope, notation, slice(arguments, 1), false);
	},

	// @deprecated
	res: function res(notation) {
		if (callable(console && console.warn)) {
			console.warn('DotCfg: "res" method is deprecated, call "resolve" method instead!');
		}
		return this.resolve(notation);
	},

	/**
	 * Write in scope.
	 * @param notation: A object path.
	 * @param value: Arguments for the object.
	 * @param strategy: Arguments for the object.
	 * @returns DotCfg
	 */
	set: function set(notation, value, strategy) {
		var this$1 = this;

		var fn = !undef(value) && callable(strategy) ? strategy : this.strategy;
		if (object(notation)) {
			var context;
			for (var key in notation) {
				if (ownProperty(notation, key)) {
					context = write(this$1.scope, key, notation[key], fn);
				}
			}
			return context;
		}
		write(this.scope, notation, value, fn);
		return this;
	},

	/**
	 * Read scope notation.
	 * @param notation: A object path.
	 * @param defaultValue: A fallback value.
	 * @returns any
	 */
	get: function get(notation, defaultValue) {
		var value = read(this.scope, notation);
		return undef(value) ? defaultValue : value;
	},

	/**
	 * Write/Read/Delete/Update a config with strategy method if needed.
	 * @param notation: A object path.
	 * @param value: Arguments for the object.
	 * @param strategy: Arguments for the object.
	 * @returns DotCfg
	 */
	cfg: function cfg(notation, value, strategy) {
		var hasArg = arguments.length > 1;
		if (!notation) {
			return this.scope;
		}
		if (notation === true) {
			return assignStrategy({}, this.scope);
		}
		if (primitive(notation)) {
			return hasArg ? this.set(notation, value, strategy) : this.get(notation);
		}
		this.extends(notation);
		return this;
	},
};

/**
 * Static methods
 */
DotCfg.strategy = dotDefault;
DotCfg.assign = assignStrategy;
DotCfg.normalize = normalize;
DotCfg.resolver = resolver;
DotCfg.resolve = resolve;
DotCfg.write = write;
DotCfg.read = read;

module.exports = DotCfg;
