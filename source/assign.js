var is = require('describe-type').is;

module.exports = function (strategy) {
	var notation = '';
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
				if (is.array(outputValue) || is.array(sourceValue)) {
					var f = is.array(sourceValue) ? sourceValue.slice() : [];
					var o = is.array(outputValue) ? outputValue.slice() : [];
					output[key] = strategy(f, o, notation + '.' + key, keys);
				} else if (is.callable(outputValue) || is.callable(sourceValue)) {
					output[key] = strategy(sourceValue, outputValue, notation + '.' + key, keys);
				} else if (is.object(outputValue) || is.object(sourceValue)) {
					var cn = notation;
					notation = (cn ? cn + '.' : '') + key;
					output[key] = assign(outputValue, sourceValue);
					notation = cn;
				} else {
					output[key] = strategy(sourceValue, outputValue, notation + '.' + key, keys);
				}
			}
		}
		return output;
	};
};
