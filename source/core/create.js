/*!
 * Creates a new object with the specified
 * prototype object and properties.
 * @param proto:
 */
module.exports = function (proto) {
	function DotCfg() {/* ! */}
	DotCfg.prototype = proto;
	return new DotCfg();
};
