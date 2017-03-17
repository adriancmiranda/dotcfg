var isFn = require('../types/is-fn');
var isObject = require('../types/is-object');

module.exports = function(strategy) {
	return function assign(target) {
		var args = Array.prototype.slice.call(arguments);
		var output = Object(target || {});
		for (var ix = 1; ix < args.length; ix++) {
			var from = args[ix];
			var keys = Object.keys(Object(from));
			var cpath = '';
			for (var iy = 0; iy < keys.length; iy++) {
				var key = keys[iy];
				if (Array.isArray(output[key]) || Array.isArray(from[key])) {
					var o = Array.isArray(output[key]) ? output[key].slice() : [];
					var f = Array.isArray(from[key]) ? from[key].slice() : [];
					output[key] = strategy(f, o, cpath, keys);
				} else if (isFn(output[key]) || isFn(from[key])) {
					output[key] = strategy(from[key], output[key], cpath, keys);
				} else if (isObject(output[key]) || isObject(from[key])) {
					output[key] = assign(from[key], output[key]);
				} else {
					output[key] = strategy(from[key], output[key], cpath, keys);
				}
			}
		}
		return output;
	};
};
