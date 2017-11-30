/*!
 * Creates a new object with the specified
 * prototype object and properties.
 * @param proto:
 */
export default function create(proto) {
	function DotCfg() {/* ! */}
	DotCfg.prototype = proto;
	return new DotCfg();
}
