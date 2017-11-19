/* eslint-disable no-var */
var is = require('describe-type').is;

var dot = /\.(?![^[]*\])/g;
var blank = [];

module.exports = function (path) {
	if (is.string(path)) {
		return path.split(dot);
	}
	return Array.isArray(path) ? path : blank;
};
