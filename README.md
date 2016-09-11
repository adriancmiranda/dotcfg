# nso
Namespace object

## Getting Started

### Install:

#### from github:

```bash
npm i -S adriancmiranda/nso
```

#### from npm:

```bash
npm i -S nso
```

### Usage:

```node
const nso = require('nso');

const YPN = nso('YourProjectNamespace');
YPN.uri('env.url.host', process.env.HOST || '0.0.0.0'); // { env:{ url:{ host:'0.0.0.0' } } }
YPN.uri('env.url.port', process.env.PORT || 3000); // { env:{ url:{ host:'0.0.0.0', port:3000 } } }

console.log(YPN.uri('env')); // { url:{ host:'0.0.0.0', port:3000 } } }
console.log(YPN.uri('env.url')); // { host:'0.0.0.0', port:3000 }
console.log(YPN.uri('env.url.host')); // '0.0.0.0'
```

or

```node
const YPN = require('nso').stub(global, 'YourProjectNamespace');
YPN.uri('env.url.host', process.env.HOST || '0.0.0.0'); // { env:{ url:{ host:'0.0.0.0' } } }
YPN.uri('env.url.port', process.env.PORT || 3000); // { env:{ url:{ host:'0.0.0.0', port:3000 } } }

console.log(YPN.uri('env')); // { url:{ host:'0.0.0.0', port:3000 } } }
console.log(YPN.uri('env.url')); // { host:'0.0.0.0', port:3000 }
console.log(YPN.uri('env.url.host')); // '0.0.0.0'

```
