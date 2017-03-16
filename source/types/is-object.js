module.exports = function isObject(value) {
	return toString.call(value) === '[object Object]';
}
