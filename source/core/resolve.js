import apply from 'describe-type/internal/apply.next.js';
import callable from 'describe-type/is/callable.next.js';
import read from './read';

export default function resolve(scope, path, args, blindly) {
	const part = read(scope, path);
	if (callable(part)) {
		return apply(part, scope, args, blindly);
	}
	return part;
}
