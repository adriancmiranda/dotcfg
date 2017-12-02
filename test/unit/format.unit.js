import format from '../../source/core/format.js';

ava('format', t => {
  t.is(toString.call(format), '[object Function]');
});
