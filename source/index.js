/* global window */
/* eslint-disable no-console, spaced-comment, new-cap, comma-dangle, no-restricted-syntax */
import apply from 'describe-type/source/@/apply.js';
import slice from 'describe-type/source/@/slice.js';
import ownProperty from 'describe-type/source/has/ownProperty.js';
import primitive from 'describe-type/source/is/primitive.js';
import callable from 'describe-type/source/is/callable.js';
import string from 'describe-type/source/is/string.js';
import object from 'describe-type/source/is/object.js';
import undef from 'describe-type/source/is/undef.js';
import read from './core/read';
import write from './core/write';
import proxy from './core/proxy';
import assign from './core/assign';
import validate from './core/validate';
import assignStrategyDefault from './strategies/assign-default';
import dotStrategyDefault from './strategies/dot-default';

/*!
 * Public methods.
 */
const fns = 'res exe cfg get set'.split(' ');

/*!
 * Mixing behaviors.
 */
const assignStrategy = assign(assignStrategyDefault);

/*!
 * A global GUID counter for objects.
 */
let guid = 1;

/*!
 * Define a local copy of `DotCfg`.
 * @param namespace: A string containing a qualified name to identify objects from.
 * @param scope: A object that have system-wide relevance.
 * @param strategy: A function that configures the input values.
 */
const DotCfg = function (namespace/*?*/, scope/*?*/, strategy/*?*/) {
	if (!primitive(namespace)) {
		strategy = scope;
		scope = namespace;
		namespace = undefined;
	}
	const expose = undef(global) ? window : global;
	const self = primitive(scope) ? expose : scope;
	const fn = callable(strategy) ? strategy : dotStrategyDefault;
	return new DotCfg.fn.init(namespace, self, fn);
};

/*!
 * Create a instance of `DotCfg`.
 * @param namespace: A string containing a qualified name to identify objects from.
 * @param scope: A object that have system-wide relevance.
 * @param strategy: A function that configures the input values.
 */
const init = function (namespace/*?*/, scope/*?*/, strategy/*?*/) {
	if (string(namespace)) {
		scope[namespace] = scope[namespace] || Object.create(null);
		scope = scope[namespace];
	}
	this.strategy = strategy;
	this.extends = proxy(assign(strategy), this, scope);
	this.namespace = namespace || `dot${guid}`;
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
const cfg = function (notation/*?*/, value/*?*/, strategy/*?*/) {
	const hasArg = arguments.length > 1;
	if (!notation) {
		return this.scope(true);
	}
	if (notation === true) {
		const cp = assignStrategy({}, this.scope());
		for (let id = 0, key, acc; id < fns.length; id += 1) {
			key = fns[id];
			acc = `@${key}`;
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
const res = function (notation/*!*/) {
	const scope = this.scope();
	const part = read(scope, notation);
	const args = slice(arguments, 1);
	return callable(part) ? apply(part, scope, args) : part;
};

/*!
 * *** DEPRECATED METHOD ***
 * Read safely a key containing a function or a simple property.
 * @param notation: A object path.
 * @param ...rest: Arguments for the object.
 */
const exe = function (notation/*!*/) {
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
const setter = function (notation/*!*/, value/*!*/, strategy/*?*/) {
	const fn = !undef(value) && callable(strategy) ? strategy : this.strategy;
	if (object(notation)) {
		let context;
		for (const key in notation) {
			if (ownProperty(notation, key)) {
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
const getter = function (notation/*!*/, defaultValue/*?*/) {
	const value = read(this.scope(), notation);
	return undef(value) ? defaultValue : value;
};

/*!
 * @public Methods and properties.
 */
DotCfg.prototype = {
	constructor: DotCfg,
	get: getter,
	set: setter,
	init,
	cfg,
	res,
	exe,
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
