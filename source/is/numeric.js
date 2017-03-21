module.exports = function (value) {
	return !isNaN(parseFloat(value, 10)) && isFinite(value);
};
