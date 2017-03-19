var isFn = require('./is/function');
var isObject = require('./is/object');

module.exports = function(strategy) {
	return function assign(target) {
		var args = Array.prototype.slice.call(arguments);
		var output = Object(target || {});
		for (var ix = 1; ix < args.length; ix++) {
			var from = args[ix];
			var keys = Object.keys(Object(from));
			var path = '';
			for (var iy = 0; iy < keys.length; iy++) {
				var key = keys[iy];
				var outputValue = output[key];
				var sourceValue = from[key];
				if (Array.isArray(outputValue) || Array.isArray(sourceValue)) {
					var o = Array.isArray(outputValue) ? outputValue.slice() : [];
					var f = Array.isArray(sourceValue) ? sourceValue.slice() : [];
					output[key] = strategy(f, o, path, keys);
				} else if (isFn(outputValue) || isFn(sourceValue)) {
					output[key] = strategy(sourceValue, outputValue, path, keys);
				} else if (isObject(outputValue) || isObject(sourceValue)) {
					output[key] = assign(sourceValue, outputValue);
				} else {
					output[key] = strategy(sourceValue, outputValue, path, keys);
				}
			}
		}
		return output;
	};
};
