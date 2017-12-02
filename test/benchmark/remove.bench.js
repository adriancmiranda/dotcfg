import benchmark from 'benchmark';
import microtime from 'microtime';
import remove from '../../source/core/remove.js';

ava('remove', t => {
  t.is(toString.call(remove), '[object Function]');
});
