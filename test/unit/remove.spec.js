import remove from '../../source/core/remove.js';

ava('remove', t => {
  t.is(toString.call(remove), '[object Function]');
});
