/* global window */
/* eslint-disable spaced-comment, new-cap, comma-dangle */
var is = require('./source/is');
var read = require('./source/read');
var write = require('./source/write');
var assign = require('./source/assign');
var assignStrategyDefault = require('./source/strategies/assign-default');
var dotStrategyDefault = require('./source/strategies/dot-default');

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
	if (is.objectLike(namespace)) {
		strategy = scope;
		scope = namespace;
		namespace = undefined;
	}
	return new DotCfg.fn.init(namespace, scope, strategy);
};

/*!
 * Create a instance of `DotCfg`.
 * @param namespace: A string containing a qualified name to identify objects from.
 * @param scope: A object that have system-wide relevance.
 * @param strategy: A function that configures the input values.
 */
var init = function (namespace/*?*/, scope/*?*/, strategy/*?*/) {
	var expose = is.defined(global) ? global : window;
	var self = is.objectLike(scope) ? scope : expose;
	if (is.string(namespace)) {
		self[namespace] = self[namespace] || Object.create(null);
		self = self[namespace];
	}
	this.strategy = is.fn(strategy) ? strategy : dotStrategyDefault;
	this.extends = proxy(assign(this.strategy), this, self);
	this.namespace = namespace || 'dot' + guid;
	this.scope = validate(self, this);
	guid++;
};

/*!
 * Takes a function and returns a new one that will always have a particular context.
 * @param fn: The function whose context will be changed.
 * @param context: The object to which the context (this) of the function should be set.
 * @param ...rest: Prefix arguments.
 */
var proxy = function(fn/*!*/, context/*!*/){
	var args = Array.prototype.slice.call(arguments, 2);
	var bind = function() {
		return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
	};
	bind.__originalFn__ = bind.__originalFn__ || fn;
	return bind;
};

/*!
 *
 * @param self:
 * @param instance:
 */
var validate = function(self, instance) {
	var cache = {};
	var fns = 'resolve exe cfg get set'.split(' ');
	for (var id = 0, key; id < fns.length; id++) {
		key = fns[id];
		if (self[key]) {
			self[key + '$'] = self[key];
			cache[key] = self[key];
		}
		self[key] = proxy(instance[key], instance);
	}
	return function(flush) {
		if (flush) {
			for (var id = 0, key; id < fns.length; id++) {
				key = fns[id];
				if (cache[key]) {
					self[key] = cache[key];
					delete self[key + '$']
				} else {
					delete self[key];
				}
			}
		}
		return self;
	};
};

/*!
 * Write/Read/Delete/Update a config with strategy method if needed.
 * @param notation:
 * @param value:
 * @param strategy:
 */
var cfg = function (notation/*?*/, value/*?*/, strategy/*?*/) {
	var hasArg = arguments.length > 1;
	if (!notation || notation === true) {
		return notation ? assignStrategy({}, this.scope(true)) : this.scope(true);
	}
	if (is.objectLike(notation)) {
		return this.extends(notation);
	}
	return hasArg ? this.set(notation, value, strategy) : this.get(notation);
};

/*!
 * Read safely a key containing a function or a simple property.
 * @param notation: A object path.
 * @param ...rest: Arguments for the object.
 */
var resolve = function (notation/*!*/) {
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
		console.warn('DotCfg: "exe" method is deprecated, call "resolve" method instead!');
	}
	return resolve(notation);
};

/*!
 * Write in scope.
 * @param notation: A object path.
 * @param value: Arguments for the object.
 * @param strategy: Arguments for the object.
 */
var setter = function (notation/*!*/, value/*!*/, strategy/*?*/) {
	var fn = is.defined(value) && is.fn(strategy) ? strategy : this.strategy;
	return write(this.scope(), notation, value, fn);
};

/*!
 * Read scope notation.
 * @param notation: A object path.
 * @param defaultValue: A fallback value.
 */
var getter = function (notation/*!*/, defaultValue/*?*/) {
	var value = read(this.scope(), notation);
	return is.defined(value) ? value : defaultValue;
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
	resolve: resolve,
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
