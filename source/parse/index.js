var parseNotation = require('./notation');
var isNumeric = require('../is/numeric');

var hasBrackets = /\[|\]/;
var parts = /(\[{1}\s{0,1})(.{0,}?\]{0,})(\s{0,1}\]{1})/g;

module.exports = function (path) {
	var notation = parseNotation(path);
	for (var x = 0; x < notation.length; x++) {
		if (hasBrackets.test(notation[x])) {
			notation[x] = notation[x].replace(parts, ',$2').split(',');
			for (var y = 1; y <= notation[x].length; y++) {
				if (isNumeric(notation[x][y])) {
					notation[x][y] = parseInt(notation[x][y], 10);
				}
			}
		}
	}
	return Array.prototype.concat.apply([], notation);
};

module.exports.notation = parseNotation;
