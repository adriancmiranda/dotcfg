var isFn = require('./is/function');
var isObject = require('./is/object');

module.exports = function (strategy) {
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
				var notation = key;
				if (Array.isArray(outputValue) || Array.isArray(sourceValue)) {
					var f = Array.isArray(sourceValue) ? sourceValue.slice() : [];
					var o = Array.isArray(outputValue) ? outputValue.slice() : [];
					output[key] = strategy(f, o, notation, keys);
				} else if (isFn(outputValue) || isFn(sourceValue)) {
					output[key] = strategy(sourceValue, outputValue, notation, keys);
				} else if (isObject(outputValue) || isObject(sourceValue)) {
					output[key] = assign(outputValue, sourceValue);
				} else {
					output[key] = strategy(sourceValue, outputValue, notation, keys);
				}
			}
		}
		return output;
	};
};
