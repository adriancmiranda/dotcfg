/* eslint-disable no-cond-assign, no-plusplus, no-empty */
import parse from './parse.js';

export default function read(scope, notation) {
	let id = 0;
	const keys = parse(notation);
	const total = keys.length;
	while ((scope = scope[keys[id++]]) && id < total) { }
	return id < total ? undefined : scope;
}
