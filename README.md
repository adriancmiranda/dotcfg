# dotcfg

## Getting Started

### Install:

```bash
npm i -S adriancmiranda/dotcfg
```

or

```bash
bower i -S adriancmiranda/dotcfg
```

or yet

```bash
npm i -S dotcfg
```

### How it works:

```javascript
interface DotCfg {
	/**
	 * Write/Read/Delete/Update a config with strategy method if needed.
	 */
	cfg(key: string|boolean|Object, value?: any, strategy?: Function): any;
	
	/**
	 * Read safely a key containing a function or a simple property
	 */
	exe(key: string, ...rest: any[]):any
	
	/**
	 * End the most recent cfg chain and return the target.
	 * @param This method does not accept any arguments.
	 */
	end():DotCfg

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
```

### Usage:

```javascript
const dotcfg = require('dotcfg')
const NS = dotcfg('NS')
.cfg('env.url.host', process.env.HOST || '0.0.0.0') // { env:{ url:{ host:'0.0.0.0' } } }
.cfg('env.url.port', process.env.PORT || 3000) // { env:{ url:{ host:'0.0.0.0', port:3000 } } }
.cfg('resolve.extensions[1].name', '.js') // { resolve:{ extensions:{ '1': { name: '.js' } } } }
.cfg('watchOptions.pool', undefined); // { watchOptions:{} }
.cfg('process[env.NODE_ENV]', 'DEV') // { process:{ 'env.NODE_ENV': 'DEV' } }

console.log(NS.cfg(true /* true, brings a deep copy of raw object, false, brings a raw object */));
console.log(NS.cfg('env')); // { url:{ host:'0.0.0.0', port:3000 } } }
console.log(NS.cfg('env.url')); // { host:'0.0.0.0', port:3000 }
console.log(NS.cfg('env.url.host')); // '0.0.0.0'
console.log(NS.cfg('resolve.extensions[1]')); // { name:'.js' }
console.log(NS.resolve.extensions[1].name); // '.js'
```

### Playground

* [webpack:base:raw](https://runkit.com/adriancmiranda/57f1037ef5fa9d1400830169)
* [webpack:base:dot](https://runkit.com/adriancmiranda/57f1064ff5fa9d1400830272)
