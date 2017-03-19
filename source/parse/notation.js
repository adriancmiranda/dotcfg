var isString = require('../is/string');

var dot = /\.(?![^[]*\])/g;
var blank = [];

module.exports = function(path) {
	if (isString(path)) {
		return path.split(dot);
	}
	return Array.isArray(path) ? path : blank;
};
