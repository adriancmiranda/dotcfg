import benchmark from 'benchmark';
import microtime from 'microtime';
import read from '../../source/core/read.js';

const value = {};

new benchmark.Suite()

.add('----', () => {
})

.add('read', () => {
})

.on('cycle', ({ target }) => {
  console.log(String(target));
})

.on('complete', function () {
  console.log('\nFastest is ' + this.filter('fastest').map('name'), '\n');
})

.run({ async: true });
