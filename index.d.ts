interface DotCfg {
	/**
	 * Write/Read/Delete/Update a config with strategy method if needed.
	 * @param key
	 * @param value
	 * @param strategy
	 */
	cfg(key: string|boolean|Object, value?: any, strategy?: Function): any;
	
	/**
	 * Read safely a key containing a function or a simple property.
	 * @param key 
	 * @...rest Function arguments
	 */
	exe(key: string, ...rest: any[]):any

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
