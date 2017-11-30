import apply from 'describe-type/source/@/apply.js';
import slice from 'describe-type/source/@/slice.js';

/*!
 * Takes a function and returns a new one that will always have a particular context.
 * @param fn: The function whose context will be changed.
 * @param context: The object to which the context (this) of the function should be set.
 * @param ...rest: Prefix arguments.
 */
export default function proxy(fn, context) {
	const args = slice(arguments, 2);
	const bind = function () {
		return apply(fn, context, args.concat(slice(arguments)));
	};
	bind.__originalFn__ = bind.__originalFn__ || fn;
	return bind;
}
