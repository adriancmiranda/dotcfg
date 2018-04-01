import parse from './parse.js';

export default function read(scope, notation) {
	let id = 0;
	const keys = parse(notation);
	const total = keys.length;
	for (; id < total; id += 1) {
		if (scope) {
			const key = keys[id];
			scope = scope[key];
		}
	}
	return id < total ? undefined : scope;
}
