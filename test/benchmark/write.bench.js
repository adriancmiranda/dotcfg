import benchmark from 'benchmark';
import microtime from 'microtime';
import write from '../../source/core/write.js';

ava('write', t => {
  t.is(toString.call(write), '[object Function]');
});
