interface IDotCfg {
	cfg(key?: string|boolean|Object, value?: any, strategy?: Function): IDotCfg;
	(namespace?: string|Object, target?: Object, strategy?: Function): any;
}

declare const dotcfg: IDotCfg;
declare module 'dotcfg' {
	export = dotcfg;
}
