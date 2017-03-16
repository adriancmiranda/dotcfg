import ava from 'ava';
import dotcfg from '../';
import res from '../source/core/resolve';

ava('resolve', t => {
  // call a.b.c function with arguments 'argA', 'argB' and 'argC'
  const argA = 'argA';
  const argB = 'argB';
  const argC = 'argC';
  const fn = (a, b, c) => ({ a: a, b: b, c: c });
  let resolve = res({ a: { b: { c: fn } } });
  t.deepEqual(resolve('a.b.c', argA, argB, argC), {
    a: argA,
    b: argB,
    c: argC,
  });

  // get a.b.c property value
  const propertyValue = 'This is a test';
  resolve = res({ a: { b: { c: propertyValue } } });
  t.is(resolve('a.b.c'), propertyValue);
});
