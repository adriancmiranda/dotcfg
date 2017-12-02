import benchmark from 'benchmark';
import microtime from 'microtime';
import remove from '../../source/core/remove';

ava('remove', t => {
  t.is(toString.call(remove), '[object Function]');
});
