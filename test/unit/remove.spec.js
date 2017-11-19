import ava from 'ava-spec';
import remove from '../../source/remove';

ava('remove', t => {
  t.is(toString.call(remove), '[object Function]');
});
