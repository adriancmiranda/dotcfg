import slice from 'describe-type/source/@/slice.js';
import undef from 'describe-type/source/is/undef.js';
import resolve from './resolve';

export default function resolver(scope, scopeBlindly) {
	return function (path, blindly) {
		blindly = undef(blindly) ? scopeBlindly : blindly;
		return resolve(scope, path, slice(arguments, 1), blindly);
	};
}
