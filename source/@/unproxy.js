import deletePropertyAt from './deletePropertyAt.js';

/**
 * Takes a function and removes the proxy reference.
 * @param {Function} cmd:
 * @returns {Function}
 */
export default function unproxy(fn) {
	return deletePropertyAt(fn, '__originalFn__');
}
