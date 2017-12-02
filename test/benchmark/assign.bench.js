import benchmark from 'benchmark';
import microtime from 'microtime';
import assign from '../../source/core/assign.js';

const value = {};

new benchmark.Suite()

.add('Object.assign', () => {
})

.add('assign', () => {
})

.on('cycle', ({ target }) => {
  console.log(String(target));
})

.on('complete', function () {
  console.log('\nFastest is ' + this.filter('fastest').map('name'), '\n');
})

.run({ async: true });
