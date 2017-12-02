import benchmark from 'benchmark';
import microtime from 'microtime';
import remove from '../../source/core/remove.js';

const value = {};

new benchmark.Suite()

.add('-----', () => {
})

.add('remove', () => {
})

.on('cycle', ({ target }) => {
  console.log(String(target));
})

.on('complete', function () {
  console.log('\nFastest is ' + this.filter('fastest').map('name'), '\n');
})

.run({ async: true });
