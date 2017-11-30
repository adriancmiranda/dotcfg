import ava from 'ava-spec';
import benchmark from 'benchmark';
import microtime from 'microtime';
import assign from '../../source/core/assign';

ava('assign', t => {
  t.is(toString.call(assign), '[object Function]');
});
