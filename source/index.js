/* eslint-disable no-restricted-syntax */
import { env } from 'describe-type/source/@/env.js';
import apply from 'describe-type/source/@/apply.js';
import slice from 'describe-type/source/@/slice.js';
import instanceOf from 'describe-type/source/is/instanceOf.js';
import ownProperty from 'describe-type/source/has/ownProperty.js';
import exotic from 'describe-type/source/is/exotic.js';
import primitive from 'describe-type/source/is/primitive.js';
import callable from 'describe-type/source/is/callable.js';
import as from 'describe-type/source/as/as.instanceOf.js';
import string from 'describe-type/source/is/string.js';
import object from 'describe-type/source/is/object.js';
import undef from 'describe-type/source/is/undef.js';
import assignStrategyDefault from './strategies/assignDefault.js';
import dotStrategyDefault from './strategies/dotDefault.js';
import proxy from './@/proxy.js';
import read from './core/read.js';
import write from './core/write.js';
import assign from './core/assign.js';

/**
 * A global GUID counter for objects.
 */
let guid = 0;

/**
 * Mixing behaviors.
 */
const assignStrategy = assign(assignStrategyDefault);

/**
 * Create a instance of `DotCfg`.
 * @param namespace: A string containing a qualified name to identify objects from.
 * @param scope: A object that have system-wide relevance.
 * @param strategy: A function that configures the input values.
 */
function DotCfg(namespace, scope, strategy) {
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
	if (instanceOf(DotCfg, this)) {
		this.strategy = as(Function, strategy, dotStrategyDefault);
		this.extends = proxy(assign(this.strategy), this, scope);
		this.namespace = as(String, namespace, `dot${guid += 1}`);
		this.scope = scope;
		return this;
	}
	return new DotCfg(namespace, scope, strategy);
}

/**
 * Static method to assign strategy.
 */
DotCfg.strategy = dotStrategyDefault;

/**
 * Static method to assign.
 */
DotCfg.assign = assignStrategy;

/**
 * Public methods and properties.
 */
DotCfg.prototype = {
	constructor: DotCfg,

	/**
	 * Write in scope.
	 * @param notation: A object path.
	 * @param value: Arguments for the object.
	 * @param strategy: Arguments for the object.
	 */
	set(notation, value, strategy) {
		const fn = !undef(value) && callable(strategy) ? strategy : this.strategy;
		if (object(notation)) {
			let context;
			for (const key in notation) {
				if (ownProperty(notation, key)) {
					context = write(this.scope, key, notation[key], fn);
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
	 */
	get(notation, defaultValue) {
		const value = read(this.scope, notation);
		return undef(value) ? defaultValue : value;
	},

	/**
	 * Write/Read/Delete/Update a config with strategy method if needed.
	 * @param notation: A object path.
	 * @param value: Arguments for the object.
	 * @param strategy: Arguments for the object.
	 */
	cfg(notation, value, strategy) {
		const hasArg = arguments.length > 1;
		if (!notation) {
			return this.scope;
		}
		if (primitive(notation)) {
			return hasArg ? this.set(notation, value, strategy) : this.get(notation);
		}
		return this.extends(notation);
	},

	/**
	 * Read safely a key containing a function or a simple property.
	 * @param notation: A object path.
	 * @param ...rest: Arguments for the object.
	 */
	res(notation) {
		const part = read(this.scope, notation);
		const args = slice(arguments, 1);
		return callable(part) ? apply(part, this.scope, args) : part;
	},
};

export default DotCfg;
