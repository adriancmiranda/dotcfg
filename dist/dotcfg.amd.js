/*!
 * 
 * ~~~~ dotcfg v1.6.0
 * 
 * @commit 78829815279f0006e34db7b17e1ebb71a72ea4d7
 * @moment Sunday, November 19, 2017 11:35 AM
 * @homepage https://github.com/adriancmiranda/dotcfg
 * @author Adrian C. Miranda
 * @license (c) 2016-2020 Adrian C. Miranda
 */
define(function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	// pattern(s)
	var reIsBase64 = /^(data:\w+\/[a-zA-Z+\-.]+;base64,)?([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
	var reFunctionName = /\s*function\s+([^(\s]*)\s*/;
	var reIsNativeFn = /\[native\scode\]/;
	var reStringToBoolean = /^true|[1-9]+$/gi;
	var reToPropName = /^[^a-zA-Z_$]|[^\w|$]|[^\w$]$/g;
	var reIsHex = /^([A-Fa-f0-9]+|)$/;
	var reIsHexadecimal = /^((#|0x)?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3}))?$/;
	var reIsJsonStart = /^\[|^\{(?!\{)/;
	var reEndsWithBracket = /\]$/;
	var reEndsWithBrace = /\}$/;
	var reIsJsonEnds = { '[': reEndsWithBracket, '{': reEndsWithBrace };

	// prototypes
	var ObjectProto = Object.prototype;

	// built-in method(s)
	var objectHasOwnProperty = ObjectProto.hasOwnProperty;
	var objectToString = ObjectProto.toString;

	// environment
	var inNode = typeof window === 'undefined';
	var env = inNode ? global : window;

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
		return 0 | parseInt(value, radix);
	}

	/**
	 *
	 * @function
	 * @memberof utility
	 * @param {Object} context
	 * @param {Boolean} getNum
	 * @returns {Array}
	 */
	function mod(index, min, max) {
		min = intOf(min);
		max = intOf(max) || min || 1;
		index = intOf(index);
		var value = index % max;
		return value < min ? (value + max) : value;
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
	 * @function
	 * @memberof utility
	 * @param {arraylike} value
	 * @param {int} startIndex
	 * @param {int} endIndex
	 * @returns {Array}
	 */
	function slice(list, startIndex, endIndex) {
		var range = [];
		if (arraylike(list)) {
			var size = list.length;
			var start = mod(startIndex, 0, size);
			var end = mod(endIndex, 0, size) || size;
			if (string(list)) {
				range = '';
				while (start < end) {
					range += list[start];
					start += 1;
				}
				return range;
			}
			while (start < end) {
				range[range.length] = list[start];
				start += 1;
			}
		}
		return range;
	}

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

	/**
	 *
	 * @param {Function} cmd - .
	 * @param {any} context - .
	 * @returns {any}
	 */
	function apply(cmd, context, args) {
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
	 * @memberof has
	 * @param {object} context
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function unsafeMethod(context, methodName) {
		try {
			return callable(context[methodName]);
		} catch (err) {
			return false;
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
	 * @memberof has
	 * @param {Array|String|Object|Function} context
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function own(context, value) {
		if (array(context)) { return ownValue(context, value); }
		return ownProperty(context, value);
	}



	var index = Object.freeze({
		unsafeMethod: unsafeMethod,
		ownProperty: ownProperty,
		ownValue: ownValue,
		own: own
	});

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
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function args(value) {
		return (!array(value) && arraylike(value) &&
			object(value) && unsafeMethod(value, 'callee')
		) || objectToString.call(value) === '[object Arguments]';
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function empty(value) {
		if (arraylike(value)) {
			return value.length === 0;
		}
		if (object(value)) {
			return keys(value).length === 0;
		}
		if (value && typeof value === 'object' && callable(value.valueOf)) {
			return !value.valueOf();
		}
		return !value;
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
	function enumerable(value) {
		return value != null && number(value.length) && callable(value) === false;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} valueA
	 * @param {any} valueB
	 * @returns {Boolean}
	 */
	function equal(valueA, valueB) {
		if (valueA === valueB) {
			return true;
		}
		var ctorA = valueA != null && valueA.constructor;
		var ctorB = valueB != null && valueB.constructor;
		if (ctorA !== ctorB) {
			return false;
		} else if (ctorA === Object) {
			var keysA = keys(valueA);
			var keysB = keys(valueB);
			var i = keysA.length;
			if (i !== keysB.length) {
				return false;
			}
			for (i -= 1; i > -1; i -= 1) {
				var key = keysA[i];
				if (!equal(valueA[key], valueB[key])) {
					return false;
				}
			}
			return true;
		} else if (ctorA === Array) {
			var key$1 = valueA.length;
			if (key$1 !== valueB.length) {
				return false;
			}
			for (key$1 -= 1; key$1 > -1; key$1 -= 1) {
				if (!equal(valueA[key$1], valueB[key$1])) {
					return false;
				}
			}
			return true;
		} else if (ctorA === Function) {
			return valueA.prototype === valueB.prototype;
		} else if (ctorA === Date) {
			return valueA.getTime() === valueB.getTime();
		}
		return false;
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
				if (callable(ctor) && value instanceof ctor) { return true; }
			}
		}
		if (expected === Number) { return a(expected, value); }
		return callable(expected) && value instanceof expected;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {Function|Array.<Function>} expected
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function not(expected, value) {
		return any(expected, value) === false;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function base64(value) {
		return string(value) && reIsBase64.test(value);
	}

	function hex(value) {
		return typeof value === 'string' && reIsHex.test(value);
	}

	function hexadecimal(value) {
		return string(value) && reIsHexadecimal.test(value);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function jsonlike(value) {
		if (string(value)) {
			var start = value.match(reIsJsonStart);
			return !!(start && reIsJsonEnds[start[0]].test(value));
		}
		return false;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function element(value) {
		return value != null && (
			callable(env.HTMLElement) &&
			value instanceof env.HTMLElement &&
			value.nodeType === 1
		);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {Function|Array.<Function>} expected
	 * @param {arraylike} value
	 * @returns {Boolean}
	 */
	function vector(expected, value) {
		if (arraylike(value) === false) { return false; }
		for (var i = value.length - 1; i > -1; i -= 1) {
			if (not(expected, value[i])) { return false; }
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
	function decimal(value) {
		return number(value) && value === value && infinity(value) === false && value % 1 !== 0;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function even(value) {
		return infinity(value) || (number(value) && value === value && value % 2 === 0);
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

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function odd(value) {
		return infinity(value) || (number(value) && value === value && value % 2 !== 0);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function uint(value) {
		return int(value) && value >= 0;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function buffer(value) {
		return a(env.Buffer, value);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function date(value) {
		return a(Date, value);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any}
	 * @returns {Boolean}
	 */
	function error(value) {
		if (value == null) { return false; }
		return value instanceof Error;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any}
	 * @returns {Boolean}
	 */
	function nativeFunction(value) {
		return callable(value) && reIsNativeFn.test(value.toString());
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any}
	 * @returns {Boolean}
	 */
	function nil(value) {
		return value === null;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function regexp(value) {
		return a(RegExp, value);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function symbol(value) {
		return a(env.Symbol, value);
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



	var index$1 = Object.freeze({
		a: a,
		an: a,
		any: any,
		args: args,
		empty: empty,
		enumerable: enumerable,
		equal: equal,
		exotic: exotic,
		instanceOf: instanceOf,
		not: not,
		primitive: primitive,
		base64: base64,
		hex: hex,
		hexadecimal: hexadecimal,
		jsonlike: jsonlike,
		arraylike: arraylike,
		element: element,
		vector: vector,
		decimal: decimal,
		even: even,
		infinity: infinity,
		int: int,
		nan: nan,
		numeric: numeric,
		odd: odd,
		uint: uint,
		array: array,
		bool: bool,
		buffer: buffer,
		callable: callable,
		date: date,
		error: error,
		nativeFunction: nativeFunction,
		nil: nil,
		number: number,
		object: object,
		regexp: regexp,
		string: string,
		symbol: symbol,
		undef: undef
	});

	/**
	 *
	 * @function
	 * @memberof to
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function stringOf(value, force) {
		var ctor = value != null && value.constructor;
		if (ctor && force) {
			if (!ctor.name || ctor.name === 'Object') {
				var matches = ctor.toString().match(reFunctionName);
				return matches ? matches[1] : '';
			}
			return ctor.name;
		}
		return slice(objectToString.call(value), 8, -1);
	}

	/**
	 *
	 * @function
	 * @memberof to
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function booleanOf(value) {
		if (string(value)) {
			return reStringToBoolean.test(value);
		}
		return !!value;
	}

	/**
	 * The `floatOf()` function parses an argument and returns a floating point number.
	 *
	 * @function
	 * @memberof to
	 *
	 * @param {Number|String|Object} value - The value to parse.
	 * If the string argument is not a string, then it is converted to a string
	 * (using the ToString abstract operation).
	 * Leading whitespace in the string argument is ignored.
	 *
	 * @returns {Number} A floating point number parsed from the given value.
	 * If the first character cannot be converted to a number, 0 is returned.
	 */
	function floatOf(value) {
		value = +value;
		return nan(value) || infinity(value) ? 0 : value;
	}

	/**
	 * The `uintOf()` function parses a string argument and returns an unsigned integer
	 * of the specified radix (the base in mathematical numeral systems).
	 *
	 * @function
	 * @memberof to
	 *
	 * @param {Number|String|Object} value - The value to parse.
	 * If the string argument is not a string, then it is converted to a string
	 * (using the ToString abstract operation).
	 * Leading whitespace in the string argument is ignored.
	 *
	 * @param {any} radix - An unsigned integer between 2 and 36 that represents
	 * the radix (the base in mathematical numeral systems) of the above mentioned string.
	 * Specify 10 for the decimal numeral system commonly used by humans. Always specify
	 * this parameter to eliminate reader confusion and to guarantee predictable behavior.
	 * Different implementations produce different results when a radix is not specified,
	 * usually defaulting the value to 10.
	 *
	 * @returns {Number} An unsigned integer number parsed from the given string.
	 * If the first character cannot be converted to a number, 0 is returned.
	 *
	 * min: 0
	 * max: 0xffffffff
	 */
	function uintOf(value, radix) {
		var num = intOf(value, radix);
		return num < 0 ? 0 : num;
	}

	/**
	 *
	 * @function
	 * @memberof built-in
	 * @param {any} value
	 * @returns {String}
	 */
	function typeOf(value) {
		if (infinity(value) || value == null || (typeof value === 'number' && isNaN(value))) {
			return String(value);
		}
		return args(value) ? 'Arguments' : stringOf(value, true);
	}

	/**
	 *
	 * @function
	 * @memberof built-in
	 * @param {any} value
	 * @returns {String}
	 */
	function constructorNameOf(value) {
		var name = typeOf(value);
		return (name === 'Function' && (value != null && value.name)) || name;
	}

	/**
	 *
	 * @function
	 * @memberof built-in
	 * @param {any} value
	 * @returns {String}
	 */
	function constructorOf(value) {
		if (value == null) { return value; }
		return value.constructor || Object;
	}

	/**
	 *
	 * @function
	 * @memberof built-in
	 * @param {any} value
	 * @param {Boolean} write
	 * @returns {String}
	 */
	function name(value, write) {
		if (value == null || object(value)) {
			return typeOf(value);
		}
		return value.name || (write &&
			string(value) ? value.replace(reToPropName, '_') : constructorNameOf(value)
		);
	}

	/**
	 *
	 * @function
	 * @memberof built-in
	 * @param {Function|Array.<Function>} expected
	 * @param {any} value
	 * @returns {Array}
	 */
	function typify(expected, write) {
		if (string(expected) === false && arraylike(expected) && expected.length > 0) {
			for (var i = expected.length - 1; i > -1; i -= 1) {
				expected[i] = name(expected[i], write);
			}
			return expected.join('|');
		}
		return name(expected, write);
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
			value = apply(value, args[0], args);
		}
		return any(expected, value) ? value : args[0];
	}

	/* eslint-disable no-unused-vars */



	var require$$0 = Object.freeze({
		has: index,
		is: index$1,
		as: as,
		stringOf: stringOf,
		booleanOf: booleanOf,
		floatOf: floatOf,
		intOf: intOf,
		uintOf: uintOf,
		constructorNameOf: constructorNameOf,
		constructorOf: constructorOf,
		typeOf: typeOf,
		typify: typify,
		name: name
	});

	/* eslint-disable spaced-comment */

	/*!
	 * Takes a function and returns a new one that will always have a particular context.
	 * @param fn: The function whose context will be changed.
	 * @param context: The object to which the context (this) of the function should be set.
	 * @param ...rest: Prefix arguments.
	 */
	var proxy = function (fn/*!*/, context/*!*/) {
		var args = Array.prototype.slice.call(arguments, 2);
		var bind = function () {
			return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
		};
		bind.__originalFn__ = bind.__originalFn__ || fn;
		return bind;
	};

	/* eslint-disable no-var */
	var is$2 = require$$0.is;

	var dot = /\.(?![^[]*\])/g;
	var blank = [];

	var notation$1 = function (path) {
		if (is$2.string(path)) {
			return path.split(dot);
		}
		return Array.isArray(path) ? path : blank;
	};

	var is$1 = require$$0.is;


	var hasBrackets = /\[|\]/;
	var parts = /(\[{1}\s{0,1})(.{0,}?\]{0,})(\s{0,1}\]{1})/g;

	var parse = function (path) {
		var notation = notation$1(path);
		for (var x = 0; x < notation.length; x++) {
			if (hasBrackets.test(notation[x])) {
				notation[x] = notation[x].replace(parts, ',$2').split(',');
				for (var y = 1; y <= notation[x].length; y++) {
					if (is$1.numeric(notation[x][y])) {
						notation[x][y] = parseInt(notation[x][y], 10);
					}
				}
			}
		}
		return Array.prototype.concat.apply([], notation);
	};

	var notation = notation$1;

	parse.notation = notation;

	/* eslint-disable spaced-comment */



	var read = function (scope, notation) {
		var id = 0;
		var keys = parse(notation);
		var total = keys.length;
		while ((scope = scope[keys[id++]]) && id < total) {/*!*/}
		return id < total ? undefined : scope;
	};

	var is$3 = require$$0.is;


	var write = function (target, path, value, strategy) {
		var id = 0;
		var scope = target;
		var notation = path;
		var keys = parse(notation);
		var total = keys.length - 1;
		var nextNotation;
		while (id < total) {
			notation = keys[id++];
			nextNotation = keys[id];
			if (is$3.number(nextNotation)) {
				target[notation] = new Array(parseInt(nextNotation, 10) - 1);
			}
			if (is$3.primitive(target[notation])) {
				target[notation] = {};
				target = target[notation];
			} else {
				target = target[notation];
			}
		}
		notation = keys[id];
		if (is$3.undef(value)) {
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

	var is$4 = require$$0.is;

	var assign = function (strategy) {
		var notation = '';
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
					if (is$4.array(outputValue) || is$4.array(sourceValue)) {
						var f = is$4.array(sourceValue) ? sourceValue.slice() : [];
						var o = is$4.array(outputValue) ? outputValue.slice() : [];
						output[key] = strategy(f, o, notation + '.' + key, keys);
					} else if (is$4.callable(outputValue) || is$4.callable(sourceValue)) {
						output[key] = strategy(sourceValue, outputValue, notation + '.' + key, keys);
					} else if (is$4.object(outputValue) || is$4.object(sourceValue)) {
						var cn = notation;
						notation = (cn ? cn + '.' : '') + key;
						output[key] = assign(outputValue, sourceValue);
						notation = cn;
					} else {
						output[key] = strategy(sourceValue, outputValue, notation + '.' + key, keys);
					}
				}
			}
			return output;
		};
	};

	var validate = function (scope, instance, fns) {
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

	var is$5 = require$$0.is;

	var assignDefault = function (value, target) {
		if (is$5.array(target)) {
			return target.concat(value);
		}
		return value;
	};

	var dotDefault = function (value) {
		return value;
	};

	/* global window */
	/* eslint-disable spaced-comment, new-cap, comma-dangle */
	var is = require$$0.is;








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
	 * returns a boolean indicating whether the object has
	 * the specified property as own (not inherited) property
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;

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
		var expose = is.undef(commonjsGlobal) ? window : commonjsGlobal;
		var self = is.primitive(scope) ? expose : scope;
		var fn = is.callable(strategy) ? strategy : dotDefault;
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
		this.extends = proxy(assign(strategy), this, scope);
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
		var args = Array.prototype.slice.call(arguments, 1);
		return is.callable(part) ? part.apply(scope, args) : part;
	};

	/*!
	 * *** DEPRECATED METHOD ***
	 * Read safely a key containing a function or a simple property.
	 * @param notation: A object path.
	 * @param ...rest: Arguments for the object.
	 */
	var exe = function (notation/*!*/) {
		if (is.callable(console && console.warn)) {
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

		var fn = !is.undef(value) && is.callable(strategy) ? strategy : this.strategy;
		if (is.object(notation)) {
			var context;
			for (var key in notation) {
				if (hasOwnProperty.call(notation, key)) {
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
	var dotcfg = DotCfg;

	return dotcfg;

});
