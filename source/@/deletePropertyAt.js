/**
 * Removes a property from an object; if no more references to the same property
 * are held, it is eventually released automatically.
 * @param {Object} object
 * @param {String} prop
 */
export default function deletePropertyAt(object, prop) {
	if (object == null) return object;
	const value = object[prop];
	delete object[prop];
	return value;
}
