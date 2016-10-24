interface IDotCFG {
	cfg(key?: string|boolean|Object, value?: any, strategy?: Function): IDotCFG;
	(namespace?: string|Object, target?: Object, strategy?: Function): any;
}

declare var dotcfg: IDotCFG;

declare module 'dotcfg' {
	export = dotcfg;
}
