# dotcfg
> Allows you to manage namespace objects with qualified names.

[![stability]][stability-url] [![xo]][xo-url] [![deps]][deps-url] [![depsci]][depsci-url] [![travis]][travis-url] [![appveyor]][appveyor-url]

## Getting Started

### Install:

```bash
npm install dotcfg --save
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

NYC.resolve.extensions[1].name;
// <= '.js'

NYC.cfg(true);
/*! true: brings a deep copy of raw object. */

NYC.cfg();
/*! false/undefined: flush dotcfg. */
```

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
