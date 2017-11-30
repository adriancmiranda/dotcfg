var is = require('describe-type').is;
var parse = require('../parse');

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
		if (is.number(nextNotation)) {
			target[notation] = new Array(parseInt(nextNotation, 10) - 1);
		}
		if (is.primitive(target[notation])) {
			target[notation] = {};
			target = target[notation];
		} else {
			target = target[notation];
		}
	}
	notation = keys[id];
	if (is.undef(value)) {
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
