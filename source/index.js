/* global window */
/* eslint-disable spaced-comment, new-cap, comma-dangle */
var is = require('describe-type').is;
var read = require('./core/read');
var write = require('./core/write');
var proxy = require('./core/proxy');
var assign = require('./core/assign');
var validate = require('./core/validate');
var assignStrategyDefault = require('./strategies/assign-default');
var dotStrategyDefault = require('./strategies/dot-default');

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
	var expose = is.undef(global) ? window : global;
	var self = is.primitive(scope) ? expose : scope;
	var fn = is.callable(strategy) ? strategy : dotStrategyDefault;
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
	var fn = !is.undef(value) && is.callable(strategy) ? strategy : this.strategy;
	if (is.object(notation)) {
		var context;
		for (var key in notation) {
			if (hasOwnProperty.call(notation, key)) {
				context = write(this.scope(), key, notation[key], fn);
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
DotCfg.strategy = dotStrategyDefault;
DotCfg.assign = assignStrategy;
module.exports = DotCfg;
