import ava from 'ava-spec';
import benchmark from 'benchmark';
import microtime from 'microtime';
import remove from '../source/remove';

ava('remove', t => {
  t.is(toString.call(remove), '[object Function]');
});
