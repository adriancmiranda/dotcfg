import apply from 'describe-type/source/@/apply.js';
import slice from 'describe-type/source/@/slice.js';
import callable from 'describe-type/source/is/callable.js';
import read from './read';

export default function resolve(scope) {
	return function (path) {
		const part = read(scope, path);
		return callable(part) ? apply(part, scope, slice(arguments, 1)) : part;
	};
}
