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

### Usage:

```javascript
var ns = dotcfg([namespace:String][, scope:Object]):Object
ns.cfg([namespace:String][, value:*]):*
```

```javascript
const dotcfg = require('dotcfg');
const NS = dotcfg('NS');

NS.cfg('env.url.host', process.env.HOST || '0.0.0.0'); // { env:{ url:{ host:'0.0.0.0' } } }
NS.cfg('env.url.port', process.env.PORT || 3000); // { env:{ url:{ host:'0.0.0.0', port:3000 } } }

console.log(NS.cfg('env')); // { url:{ host:'0.0.0.0', port:3000 } } }
console.log(NS.cfg('env.url')); // { host:'0.0.0.0', port:3000 }
console.log(NS.cfg('env.url.host')); // '0.0.0.0'
```
