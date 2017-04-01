var parse = require('./parse');
var isUndefined = require('./is/undefined');
var isPrimitive = require('./is/primitive');
var isNumber = require('./is/number');

module.exports = function (target, path, value, strategy) {
	var id = 0;
	var scope = target;
	var notation = path;
	var keys = parse(notation);
	var total = keys.length - 1;
	var nextNotation;
	while (id < total) {
		notation = keys[id++];
		nextNotation = keys[id];
		if (isNumber(nextNotation)) {
			target[notation] = new Array(parseInt(nextNotation, 10) - 1);
		}
		if (isPrimitive(target[notation])) {
			target[notation] = {};
			target = target[notation];
		} else {
			target = target[notation];
		}
	}
	notation = keys[id];
	if (isUndefined(value)) {
		delete target[notation];
	} else {
		target[notation] = strategy(
			value,
			target[notation],
			notation,
			keys
		);
	}
	return scope;
};
