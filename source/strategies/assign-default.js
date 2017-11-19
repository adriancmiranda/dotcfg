const is = require('describe-type').is;

module.exports = function (value, target) {
	if (is.array(target)) {
		return target.concat(value);
	}
	return value;
};
