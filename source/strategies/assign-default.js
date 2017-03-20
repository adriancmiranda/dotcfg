module.exports = function (value, target) {
	if (Array.isArray(target)) {
		return target.concat(value);
	}
	return value;
};
