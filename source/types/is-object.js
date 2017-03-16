module.exports = function(value) {
	return toString.call(value) === '[object Object]';
}
