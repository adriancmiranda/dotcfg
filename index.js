(function (global, name, factory) {
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory(global, exports, name);
	} else if (typeof define === 'function' && define.amd) {
		define(['exports'], function (exports) {
			return factory(global, exports, name);
		});
	} else global[name] = factory(global, {}, name);
}(typeof window !== 'undefined' ? window : global, 'dotcfg', function (global, exports, name) {
	'use strict';

	var objectAssessor = /\[(["']?)([^\1]+?)\1?\]/g;
	var startWithDot = /^\./;
	var spaces = /\s/g;

	function isUndefined(value) {
		return typeof value === 'undefined';
	}

	function isFunction(value) {
		return typeof value === 'function';
	}

	function isLikeObject(value) {
		return value === Object(value);
	}

	function isObject(value) {
		return toString.call(value) === '[object Object]';
	}

	function dotStrategy(target, value) {
		if (Array.isArray(target)) {
			return target.concat(value);
		}
		if (isObject(target) && isObject(value)) {
			return assign(target, value);
		}
		return value;
	}

	function replacer(match, p1, p2) {
		return (isNaN(p2) ? ' ' : '.') + p2;
	}

	function ls(path) {
		var keys = path.replace(spaces, '').replace(objectAssessor, replacer);
		keys = keys.replace(startWithDot, '').split(spaces);
		keys = keys.length > 1 ? keys.filter(String) : keys[0].split('.');
		return keys;
	}

	function write(target, path, value, strategy){
		var id = 0,
		dot = target,
		opath = path,
		keys = ls(path),
		total = keys.length - 1;
		while (id < total) {
			path = keys[id++];
			if (!isLikeObject(target[path])) {
				target = target[path] = {};
			} else {
				target = target[path];
			}
		}
		path = keys[id];
		if (isUndefined(value)) delete target[path];
		else (target[path] = strategy(target[path], value, opath, keys));
		return dot;
	}

	function read(target, path){
		var id = 0,
		keys = ls(path),
		total = keys.length;
		while ((target = target[keys[id++]]) && id < total) {}
		return id < total ? void(0) : target;
	}

	function assign(target, source){
		var args = Array.prototype.slice.call(arguments);
		var output = Object(target || {});
		for (var ix = 1; ix < args.length; ix++) {
			var from = args[ix];
			var keys = Object.keys(Object(from));
			for (var iy = 0; iy < keys.length; iy++) {
				var key = keys[iy];
				if (Array.isArray(output[key]) || Array.isArray(from[key])) {
					var o = (Array.isArray(output[key]) ? output[key].slice() : []);
					var f = (Array.isArray(from[key]) ? from[key].slice() : []);
					output[key] = o.concat(f);
				} else if (isFunction(output[key]) || isFunction(from[key])) {
					output[key] = from[key];
				} else if (isObject(output[key]) || isObject(from[key])) {
					output[key] = assign(output[key], from[key]);
				} else {
					output[key] = from[key];
				}
			}
		}
		return output;
	}

	function getCfg(target, copy) {
		target = copy ? assign({}, target) : target;
		delete target.namespace;
		delete target.cfg;
		delete target.exe;
		delete target.end;
		return target;
	}

	function uri(target, defaultStrategy) {
		return function cfg(key, value, strategy) {
			var hasValue = arguments.length > 1;
			if (!key || key === true) return getCfg(target, key);
			if (isLikeObject(key)) return assign(target, key);
			strategy = value && isFunction(strategy) ? strategy : defaultStrategy;
			return hasValue ? write(target, key, value, strategy) : read(target, key);
		};
	}

	function run(scope) {
		return function exe(key) {
			var piece = read(scope, key);
			var params = Array.prototype.slice.call(arguments, 1);
			return typeof piece === 'function' ? piece.apply(scope, params) : piece;
		};
	}

	function get(scope) {
		return function end(){
			return scope;
		};
	}

	function stub(namespace, target, strategy) {
		if (isLikeObject(namespace)) {
			strategy = target;
			target = namespace;
		} else {
			target = isLikeObject(target) ? target : global;
			target = target[namespace] = target[namespace] || {};
			target.namespace = namespace;
		}
		target.cfg = uri(target, isFunction(strategy) ? strategy : dotStrategy);
		target.exe = run(target);
		target.end = get(target);
		return target;
	}

	stub.assign = assign;
	stub.strategy = dotStrategy;
	exports[name] = stub;
	return stub;
}));
