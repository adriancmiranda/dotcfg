interface DotCfg {
	/**
	 * Write a property with strategy method.
	 */
	cfg(key: string, value?: any, strategy?: Function): DotCfg;

	/**
	 * Write a property with strategy method.
	 */
	cfg(key: string, value?: any): DotCfg;

	/**
	 * Write config hash.
	 */
	cfg(key: Object): DotCfg;

	/**
	 * Read config or only a property.
	 */
	cfg(key: string|boolean): any;

	/**
	 * Read config object and flush the dot.
	 */
	cfg(): any;

	/**
	 * Should be named to avoid ambiguity and minimize the risk of naming collisions.
	 */
	namespace: string;

	/**
	 * @param namespace A string containing a qualified name to identify objects from.
	 * @param target A object that have system-wide relevance.
	 * @param strategy A function that configures the input values.
	 */
	(namespace: string, target?: Object, strategy?: Function): any;

	/**
	 * @param target A object that have system-wide relevance.
	 * @param strategy A function that configures the input values.
	 */
	(target: Object, strategy?: Function): any;

	/**
	 * @param namespace A string containing a qualified name to identify objects from.
	 */
	(namespace: string): any;
}

declare const dotcfg: DotCfg;
declare module 'dotcfg' {
	export = dotcfg;
}
