interface DotCFG {
	cfg(key?: string|boolean|Object, value?: any, strategy?: Function): DotCFG;
	(namespace?: string|Object, target?: Object, strategy?: Function): any;
}

declare var dotcfg: DotCFG;

declare module 'dotcfg' {
	export = dotcfg;
}
