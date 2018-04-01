import apply from 'describe-type/source/@/apply.js';
import callable from 'describe-type/source/is/callable.js';
import read from './read';

export default function resolve(scope, path, args, blindly) {
	const part = read(scope, path);
	if (callable(part)) {
		return apply(part, scope, args, blindly);
	}
	return part;
}
