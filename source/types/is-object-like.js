module.exports = function isObjectLike(value) {
	return value === Object(value);
};
