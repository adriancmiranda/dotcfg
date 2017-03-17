# dotcfg
> Allows you to manage namespace objects with qualified names.

[![stability]][stability-url] [![xo]][xo-url] [![deps]][deps-url] [![depsci]][depsci-url] [![travis]][travis-url] [![appveyor]][appveyor-url]

## Getting Started

### Install:

```bash
npm i -S dotcfg
```

or

```bash
bower i -S dotcfg
```

or yet

```bash
npm i -S adriancmiranda/dotcfg
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

* [runkit](https://runkit.com/npm/dotcfg)


[xo]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo-url]: https://github.com/sindresorhus/xo

[travis]: https://travis-ci.org/adriancmiranda/dotcfg.svg?branch=master
[travis-url]: https://travis-ci.org/adriancmiranda/dotcfg

[appveyor]: https://ci.appveyor.com/api/projects/status/hucvow1n0t3q3le3/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/adriancmiranda/dotcfg/branch/master

[stability]: http://badges.github.io/stability-badges/dist/experimental.svg
[stability-url]: http://learnhtmlwithsong.com/blog/wp-content/uploads/2014/12/errors-everywhere-meme.png

[deps]: https://david-dm.org/adriancmiranda/dotcfg.svg
[deps-url]: https://david-dm.org/adriancmiranda/dotcfg

[depsci]: https://dependencyci.com/github/adriancmiranda/dotcfg/badge
[depsci-url]: https://dependencyci.com/github/adriancmiranda/dotcfg
