(function(global, name, factory){
	'use strict';
	if(typeof module === 'object' && typeof module.exports === 'object'){
		module.exports = factory(global, exports, name);
	}else if(typeof define === 'function' && define.amd){
		define(['exports'], function(exports){
			return factory(global, exports, name);
		});
	}else global[name] = factory(global, {}, name);
}(typeof window !== 'undefined'? window : global, 'dotcfg', function(global, exports, name){
	'use strict';

	// TODO: Define object qualified names
	// (extractKeys = /.*\[([^0-9]+)\].*/g);
	// E.G.: cfg('locals[process.env.NODE_ENV]', 'production');
	// cfg('locals[process.env.NODE_ENV]') // { locals: { 'process.env.NODE_ENV': 'production' } }
	var objectAssessor = /\[(["']?)([^\1]+?)\1?\]/g;
	var startWithDot = /^\./;
	var defaultStrategy;

	function dotStrategy(target, value, path) {
		if(typeof value === 'undefined'){
			delete(target[path]);
		}else{
			target[path] = value;
		}
		return target[path];
	}

	function ls(path){
		var keys = path.replace(objectAssessor, '.$2');
		keys = keys.replace(startWithDot, '');
		return keys.split('.');
	}

	function write(target, path, value, strategy){
		var id = 0;
		var keys = ls(path);
		var total = keys.length - 1;
		var isLikeObject;
		while(id < total){
			path = keys[id++];
			isLikeObject = target[path] === Object(target[path]);
			target = target[path] = isLikeObject? target[path] : {};
		}
		return strategy(target, value, keys[id]);
	}

	function read(target, path){
		var id = 0;
		var keys = ls(path);
		var total = keys.length;
		while((target = target[keys[id++]]) && id < total){}
		return id < total? void(0) : target;
	}

	function assign(target){
		if(target === undefined || target === null){
			throw new TypeError('Cannot convert undefined or null to object');
		}
		var output = Object(target);
		for(var index = 1; index < arguments.length; index++){
			var source = arguments[index];
			if(source !== undefined && source !== null){
				for(var nextKey in source){
					if(source.hasOwnProperty(nextKey)){
						if(source[nextKey] === Object(source[nextKey])){
							output[nextKey] = assign(source[nextKey]);
						}else{
							output[nextKey] = source[nextKey];
						}
					}
				}
			}
		}
		return output;
	}

	function getCfg(target) {
		target = assign({}, target);
		delete target.namespace;
		delete target.cfg;
		return target;
	}

	function uri(key, value, strategy){
		if(!key) return getCfg(this);
		var hasValue = arguments.length > 1;
		strategy = value && typeof strategy === 'function'? strategy : defaultStrategy;
		return hasValue? write(this, key, value, strategy) : read(this, key);
	}

	function stub(namespace, target, strategy){
		defaultStrategy = typeof strategy === 'function'? strategy : dotStrategy;
		target = target === Object(target)? target : global;
		target = target[namespace] = target[namespace] || {};
		target.namespace = namespace;
		target.cfg = uri.bind(target);
		return target;
	}

	exports[name] = stub;
	return stub;
}));
