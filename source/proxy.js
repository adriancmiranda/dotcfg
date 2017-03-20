/*!
 * Takes a function and returns a new one that will always have a particular context.
 * @param fn: The function whose context will be changed.
 * @param context: The object to which the context (this) of the function should be set.
 * @param ...rest: Prefix arguments.
 */
module.exports = function (fn/*!*/, context/*!*/) {
	var args = Array.prototype.slice.call(arguments, 2);
	var bind = function () {
		return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
	};
	bind.__originalFn__ = bind.__originalFn__ || fn;
	return bind;
};
