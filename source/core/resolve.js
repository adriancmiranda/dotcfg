var is = require('describe-type').is;
var read = require('./read');

module.exports = function (scope) {
	return function (path) {
		var part = read(scope, path);
		var args = Array.prototype.slice.call(arguments, 1);
		return is.callable(part) ? part.apply(scope, args) : part;
	};
};
