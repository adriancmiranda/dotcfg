var parse = require('./parse');
var isDefined = require('./is/defined');
var isObjectLike = require('./is/object-like');

module.exports = function(target, notation, value, strategy) {
	var id = 0;
	var scope = target;
	var notation = notation;
	var keys = parse(notation);
	var total = keys.length - 1;
	while (id < total) {
		notation = keys[id++];
		if (isObjectLike(target[notation])) {
			target = target[notation];
		} else {
			target[notation] = Object.create(null);
			target = target[notation];
		}
	}
	notation = keys[id];
	if (isDefined(value)) {
		target[notation] = strategy(
			value,
			target[notation],
			notation,
			keys
		);
	} else delete(target[notation]);
	return scope;
};
