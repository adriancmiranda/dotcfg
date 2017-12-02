import benchmark from 'benchmark';
import microtime from 'microtime';
import write from '../../source/core/write.js';

const value = {};

new benchmark.Suite()

.add('----', () => {
})

.add('write', () => {
})

.on('cycle', ({ target }) => {
  console.log(String(target));
})

.on('complete', function () {
  console.log('\nFastest is ' + this.filter('fastest').map('name'), '\n');
})

.run({ async: true });
