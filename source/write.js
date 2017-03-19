var parse = require('./parse');
var isDefined = require('./is/defined');
var isObjectLike = require('./is/object-like');

module.exports = function(target, path, value, strategy) {
	var id = 0;
	var dot = target;
	var opath = path;
	var keys = parse(path);
	var total = keys.length - 1;
	while (id < total) {
		path = keys[id++];
		if (isObjectLike(target[path])) {
			target = target[path];
		} else {
			target[path] = {};
			target = target[path];
		}
	}
	path = keys[id];
	if (isDefined(value)) {
		target[path] = strategy(value, target[path], opath, keys);
	} else {
		delete target[path];
	}
	return dot;
};
