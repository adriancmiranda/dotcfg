import slice from 'describe-type/internal/slice.next.js';
import undef from 'describe-type/is/undef.next.js';
import resolve from './resolve';

export default function resolver(scope, scopeBlindly) {
	return function (path, blindly) {
		blindly = undef(blindly) ? scopeBlindly : blindly;
		return resolve(scope, path, slice(arguments, 1), blindly);
	};
}
