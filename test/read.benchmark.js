import ava from 'ava-spec';
import benchmark from 'benchmark';
import microtime from 'microtime';
import read from '../source/read';

ava('read', t => {
  t.is(toString.call(read), '[object Function]');
});
