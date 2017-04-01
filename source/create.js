/*!
 * Creates a new object with the specified
 * prototype object and properties.
 * @param proto:
 */
module.exports = function (proto) {
	function dotcfg() {/*!*/}
	dotcfg.prototype = proto;
	return new dotcfg;
};
