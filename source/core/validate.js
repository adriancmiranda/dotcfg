var proxy = require('./proxy');

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
