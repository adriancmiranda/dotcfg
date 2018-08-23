/* eslint-disable no-plusplus */
import primitive from 'describe-type/is/primitive.next.js';
import number from 'describe-type/is/number.next.js';
import undef from 'describe-type/is/undef.next.js';
import parse from './parse.js';

export default function write(target, path, value, strategy) {
	let id = 0;
	let notation = path;
	let nextNotation;
	const scope = target;
	const keys = parse(notation);
	const total = keys.length - 1;
	while (id < total) {
		notation = keys[id++];
		nextNotation = keys[id];
		if (number(nextNotation)) {
			const size = parseInt(nextNotation, 10);
			target[notation] = size ? new Array(size - 1) : [];
		} else if (primitive(target[notation])) {
			target[notation] = {};
		}
		target = target[notation];
	}
	notation = keys[id];
	if (undef(value)) {
		delete target[notation];
	} else {
		target[notation] = strategy(value, target[notation], notation, keys);
	}
	return scope;
}
