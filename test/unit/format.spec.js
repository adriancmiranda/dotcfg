import ava from 'ava-spec';
import format from '../../source/core/format';

ava('format', t => {
  t.is(toString.call(format), '[object Function]');
});
