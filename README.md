# nsob
Namespace object

## Getting Started

### Install:

```bash
npm i -S github:adriancmiranda/nsob
```

#### Usage:

```node
const nsob = require('nsob');

const YPN = nsob('YourProjectNamespace');
YPN.uri('env.url.host', process.env.HOST || '0.0.0.0'); // { env:{ url:{ host:'0.0.0.0' } } }
YPN.uri('env.url.port', process.env.PORT || 3000); // { env:{ url:{ host:'0.0.0.0', port:3000 } } }

console.log(YPN.uri('env')); // { url:{ host:'0.0.0.0', port:3000 } } }
console.log(YPN.uri('env.url')); // { host:'0.0.0.0', port:3000 }
console.log(YPN.uri('env.url.host')); // '0.0.0.0'
```

or

```node
const YPN = require('nsob').stub(global, 'YourProjectNamespace');
YPN.uri('env.url.host', process.env.HOST || '0.0.0.0'); // { env:{ url:{ host:'0.0.0.0' } } }
YPN.uri('env.url.port', process.env.PORT || 3000); // { env:{ url:{ host:'0.0.0.0', port:3000 } } }

console.log(YPN.uri('env')); // { url:{ host:'0.0.0.0', port:3000 } } }
console.log(YPN.uri('env.url')); // { host:'0.0.0.0', port:3000 }
console.log(YPN.uri('env.url.host')); // '0.0.0.0'

```
