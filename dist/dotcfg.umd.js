/*!
 * 
 * ~~~~ dotcfg v1.6.0
 * 
 * @commit cb83d17c2032af29d1ca253dbbd0bf0f2895183c
 * @moment Saturday, December 2, 2017 4:59 PM
 * @homepage https://github.com/adriancmiranda/dotcfg
 * @author Adrian C. Miranda
 * @license (c) 2016-2020 Adrian C. Miranda
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.dotcfg = factory());
}(this, (function () { 'use strict';

	// environment
	var inNode = typeof window === 'undefined';
	var env = inNode ? global : window;

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
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function array(value) {
		return a(Array, value);
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
		return a(Function, value);
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
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function object(value) {
		return a(Object, value);
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

	var dot = /\.(?![^[]*\])/g;
	var blank = [];

	function notation(path) {
		if (string(path)) {
			return path.split(dot);
		}
		return array(path) ? path : blank;
	}

	var hasBrackets = /\[|\]/;
	var parts = /(\[{1}\s{0,1})(.{0,}?\]{0,})(\s{0,1}\]{1})/g;

	function strategies(path) {
		var notation$$1 = notation(path);
		for (var x = 0; x < notation$$1.length; x += 1) {
			if (hasBrackets.test(notation$$1[x])) {
				notation$$1[x] = notation$$1[x].replace(parts, ',$2').split(',');
				for (var y = 1; y <= notation$$1[x].length; y += 1) {
					if (numeric(notation$$1[x][y])) {
						notation$$1[x][y] = parseInt(notation$$1[x][y], 10);
					}
				}
			}
		}
		return apply(Array.prototype.concat, [], notation$$1);
	}

	strategies.notation = notation;

	/* eslint-disable no-cond-assign, no-plusplus, no-empty */
	function read(scope, notation) {
		var id = 0;
		var keys = strategies(notation);
		var total = keys.length;
		while ((scope = scope[keys[id++]]) && id < total) { }
		return id < total ? undefined : scope;
	}

	/* eslint-disable no-plusplus */
	function write(target, path, value, strategy) {
		var id = 0;
		var notation = path;
		var nextNotation;
		var scope = target;
		var keys = strategies(notation);
		var total = keys.length - 1;
		while (id < total) {
			notation = keys[id++];
			nextNotation = keys[id];
			if (number(nextNotation)) {
				target[notation] = new Array(parseInt(nextNotation, 10) - 1);
			}
			if (primitive(target[notation])) {
				target[notation] = {};
				target = target[notation];
			} else {
				target = target[notation];
			}
		}
		notation = keys[id];
		if (undef(value)) {
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

	var assign = function (strategy) {
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
						var cn = notation;
						notation = (cn ? (cn + ".") : '') + key;
						output[key] = assign(outputValue, sourceValue);
						notation = cn;
					} else {
						output[key] = strategy(sourceValue, outputValue, (notation + "." + key), keyList);
					}
				}
			}
			return output;
		};
	};

	function validate(scope, instance, fns) {
		var cache = {};
		var acc = '@';
		for (var id = 0, key = (void 0); id < fns.length; id += 1) {
			key = fns[id];
			if (scope[key]) {
				scope[acc + key] = scope[key];
				cache[key] = scope[key];
			}
			scope[key] = proxy(instance[key], instance);
		}
		return function (flush) {
			if (flush) {
				for (var id = 0, key = (void 0); id < fns.length; id += 1) {
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

	/* global window */
	/* eslint-disable no-console, spaced-comment, new-cap, comma-dangle, no-restricted-syntax */
	/*!
	 * Public methods.
	 */
	var fns = 'res exe cfg get set'.split(' ');

	/*!
	 * Mixing behaviors.
	 */
	var assignStrategy = assign(assignDefault);

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
		if (!primitive(namespace)) {
			strategy = scope;
			scope = namespace;
			namespace = undefined;
		}
		var self = primitive(scope) ? env : scope;
		var fn = callable(strategy) ? strategy : dotDefault;
		return new DotCfg.fn.init(namespace, self, fn);
	};

	/*!
	 * Create a instance of `DotCfg`.
	 * @param namespace: A string containing a qualified name to identify objects from.
	 * @param scope: A object that have system-wide relevance.
	 * @param strategy: A function that configures the input values.
	 */
	var init = function (namespace/*?*/, scope/*?*/, strategy/*?*/) {
		if (string(namespace)) {
			scope[namespace] = scope[namespace] || Object.create(null);
			scope = scope[namespace];
		}
		this.strategy = strategy;
		this.extends = proxy(assign(strategy), this, scope);
		this.namespace = namespace || ("dot" + guid);
		this.scope = validate(scope, this, fns);
		guid += 1;
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
			for (var id = 0, key = (void 0), acc = (void 0); id < fns.length; id += 1) {
				key = fns[id];
				acc = "@" + key;
				if (cp[acc]) {
					cp[key] = cp[acc];
					delete cp[acc];
				} else {
					delete cp[key];
				}
			}
			return cp;
		}
		if (primitive(notation)) {
			return hasArg ? this.set(notation, value, strategy) : this.get(notation);
		}
		return this.extends(notation);
	};

	/*!
	 * Read safely a key containing a function or a simple property.
	 * @param notation: A object path.
	 * @param ...rest: Arguments for the object.
	 */
	var res = function (notation/*!*/) {
		var scope = this.scope();
		var part = read(scope, notation);
		var args = slice(arguments, 1);
		return callable(part) ? apply(part, scope, args) : part;
	};

	/*!
	 * *** DEPRECATED METHOD ***
	 * Read safely a key containing a function or a simple property.
	 * @param notation: A object path.
	 * @param ...rest: Arguments for the object.
	 */
	var exe = function (notation/*!*/) {
		if (callable(console && console.warn)) {
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
		var this$1 = this;

		var fn = !undef(value) && callable(strategy) ? strategy : this.strategy;
		if (object(notation)) {
			var context;
			for (var key in notation) {
				if (ownProperty(notation, key)) {
					context = write(this$1.scope(), key, notation[key], fn);
				}
			}
			return context;
		}
		return write(this.scope(), notation, value, fn);
	};

	/*!
	 * Read scope notation.
	 * @param notation: A object path.
	 * @param defaultValue: A fallback value.
	 */
	var getter = function (notation/*!*/, defaultValue/*?*/) {
		var value = read(this.scope(), notation);
		return undef(value) ? defaultValue : value;
	};

	/*!
	 * @public Methods and properties.
	 */
	DotCfg.prototype = {
		constructor: DotCfg,
		get: getter,
		set: setter,
		init: init,
		cfg: cfg,
		res: res,
		exe: exe,
	};

	/*!
	 * Expose `DotCfg` and some static methods.
	 * @static strategy: Default notation strategy.
	 * @static assign: Default mixing strategy.
	 */
	DotCfg.fn = DotCfg.prototype;
	DotCfg.fn.init.prototype = DotCfg.fn;
	DotCfg.strategy = dotDefault;
	DotCfg.assign = assignStrategy;

	return DotCfg;

})));
