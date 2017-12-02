import benchmark from 'benchmark';
import microtime from 'microtime';
import read from '../../source/core/read';

ava('read', t => {
  t.is(toString.call(read), '[object Function]');
});
