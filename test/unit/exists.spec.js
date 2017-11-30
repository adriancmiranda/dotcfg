import ava from 'ava-spec';
import exists from '../../source/core/exists';

ava('exists', t => {
  t.is(toString.call(exists), '[object Function]');
});
