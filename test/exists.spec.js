import ava from 'ava-spec';
import exists from '../source/exists';

ava('exists', t => {
  t.is(toString.call(exists), '[object Function]');
});
