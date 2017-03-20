var parseNotation = require('./notation');

var hasBrackets = /\[|\]/;
var parts = /(\[{1}\s{0,1})(.{0,}?\]{0,})(\s{0,1}\]{1})/g;

module.exports = function (path) {
	var notation = parseNotation(path);
	for (var x = 0; x < notation.length; x++) {
		if (hasBrackets.test(notation[x])) {
			notation[x] = notation[x].replace(parts, ',$2').split(',');
		}
	}
	return Array.prototype.concat.apply([], notation);
};

module.exports.notation = parseNotation;
