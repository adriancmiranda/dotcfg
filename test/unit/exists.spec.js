import exists from '../../source/core/exists.js';

ava('exists', t => {
  t.is(toString.call(exists), '[object Function]');
});
