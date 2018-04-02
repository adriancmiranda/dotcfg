# dotcfg
> Allows you to manage namespace objects with qualified names.

[![stability]][stability-url] [![deps]][deps-url] [![depsci]][depsci-url] [![travis]][travis-url] [![appveyor]][appveyor-url]

## Getting Started

## Installation

```bash
npm install dotcfg --save
```

### Links to CDN

* [dotcfg.umd.js](https://rawgit.com/adriancmiranda/dotcfg/master/dist/dotcfg.umd.js)
* [dotcfg.umd.min.js](https://cdn.rawgit.com/adriancmiranda/dotcfg/master/dist/dotcfg.umd.min.js)
* [dotcfg.umd.min.js.map](https://cdn.rawgit.com/adriancmiranda/dotcfg/master/dist/dotcfg.umd.min.js.map)
* [dotcfg.umd.min.js.gz](https://cdn.rawgit.com/adriancmiranda/dotcfg/master/dist/dotcfg.umd.min.js.gz)

Use this URL for dev/testing

```html
<script src="https://rawgit.com/adriancmiranda/dotcfg/master/dist/dotcfg.umd.js"></script>
```

Use this URL in production

```html
<script src="https://cdn.rawgit.com/adriancmiranda/dotcfg/master/dist/dotcfg.umd.min.js"></script>
```

### Usage:

```javascript
const dotcfg = require('dotcfg');

const NYC = dotcfg('NYC');

// SET
// ---
NYC.cfg('env.url.host', '0.0.0.0');
// => { env:{ url:{ host:'0.0.0.0' } } }

NYC.cfg('resolve.extensions.1.name', '.js');
// => { resolve:{ extensions:{ '1':{ name:'.js' } } } }

NYC.cfg('resolve.extensions[1].name', '.js');
// => { resolve:{ extensions:[undefined, { name:'.js' }] } }

NYC.cfg('watchOptions.pool', undefined);
// => { watchOptions:{} }

NYC.cfg('process[env.NODE_ENV].type', 'DEV');
// => { process:{ 'env.NODE_ENV':{ type:'DEV' } } }


// GET
// ---
NYC.cfg('env');
// <= { url:{ host:'0.0.0.0', port:3000 } } }

NYC.cfg('env.url');
// <= { host:'0.0.0.0', port:3000 }

NYC.cfg('env.url.host');
// <= '0.0.0.0'

NYC.cfg('resolve.extensions.1');
// <= { name:'.js' }

NYC.scope.resolve.extensions[1].name;
// <= '.js'

NYC.cfg(true);
/*! true: brings a deep copy of raw object. */

NYC.cfg();
/*! false/undefined: brings dotcfg object. */
```

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
