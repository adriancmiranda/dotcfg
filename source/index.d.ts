interface DotCfg {
	/**
	 * Write/Read/Delete/Update a config with strategy method if needed.
	 * @param notation:
	 * @param value:
	 * @param strategy:
	 */
	cfg(notation: string|array|boolean|Object, value?: any, strategy?: Function): any;

	/**
	 * Read safely a key containing a function or a simple property.
	 * @param notation: A object path.
	 * @param ...rest: Arguments for the object.
	 */
	res(notation: string|array, ...rest: any[]): any;

	/**
	 * Write in scope.
	 * @param notation: A object path.
	 * @param value: Arguments for the object.
	 * @param strategy: Arguments for the object.
	 */
	set(notation: string|array|Object, value: any, strategy?: Function): DotCfg;

	/**
	 * Read scope notation.
	 * @param notation: A object path.
	 * @param defaultValue: A fallback value.
	 */
	get(notation: string|array|Object, defaultValue?: any): any;

	/**
	 * Should be named to avoid ambiguity and minimize the risk of naming collisions.
	 */
	namespace: string;

	/**
	 * A object that have system-wide relevance.
	 */
	scope: any;

	/**
	 * @param namespace: A string containing a qualified name to identify objects from.
	 * @param target: A object that have system-wide relevance.
	 * @param strategy: A function that configures the input values.
	 */
	(namespace: string, target?: Object, strategy?: Function): any;

	/**
	 * @param target: A object that have system-wide relevance.
	 * @param strategy: A function that configures the input values.
	 */
	(target: Object, strategy?: Function): any;

	/**
	 * @param namespace: A string containing a qualified name to identify objects from.
	 */
	(namespace: string): any;
}

declare const dotcfg: DotCfg;
declare module 'dotcfg' {
	export = dotcfg;
}
