import parse from '../parse/index.js';

export default function read(scope, notation) {
	let id = 0;
	const keys = parse(notation);
	const total = keys.length;
	while ((scope = scope[keys[id++]]) && id < total) {/* ! */}
	return id < total ? undefined : scope;
}
