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

```
var ns = dotcfg([scope:Object], [namespace:String]):Object
ns.uri([namespace:String][, value:*]):*
```

```javascript
const dotcfg = require('dotcfg');

const NS = dotcfg({}, 'NS');
NS.uri('env.url.host', process.env.HOST || '0.0.0.0'); // { env:{ url:{ host:'0.0.0.0' } } }
NS.uri('env.url.port', process.env.PORT || 3000); // { env:{ url:{ host:'0.0.0.0', port:3000 } } }

console.log(NS.uri('env')); // { url:{ host:'0.0.0.0', port:3000 } } }
console.log(NS.uri('env.url')); // { host:'0.0.0.0', port:3000 }
console.log(NS.uri('env.url.host')); // '0.0.0.0'
```
