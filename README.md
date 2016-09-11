# dotcfg

## Getting Started

### Install:

#### from github:

```bash
npm i -S adriancmiranda/dotcfg
```

#### from npm:

```bash
npm i -S dotcfg
```

### Usage:

```node
const NS = require('dotcfg')({}, 'NS');
NS.uri('env.url.host', process.env.HOST || '0.0.0.0'); // { env:{ url:{ host:'0.0.0.0' } } }
NS.uri('env.url.port', process.env.PORT || 3000); // { env:{ url:{ host:'0.0.0.0', port:3000 } } }

console.log(NS.uri('env')); // { url:{ host:'0.0.0.0', port:3000 } } }
console.log(NS.uri('env.url')); // { host:'0.0.0.0', port:3000 }
console.log(NS.uri('env.url.host')); // '0.0.0.0'
```
