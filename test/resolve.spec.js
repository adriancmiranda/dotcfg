import ava from 'ava-spec';
import dotcfg from '../';
import resolve from '../source/core/resolve';

ava('resolve', t => {
  // call a.b.c function with arguments 'argA', 'argB' and 'argC'
  const argA = 'argA';
  const argB = 'argB';
  const argC = 'argC';
  const fn = (a, b, c) => ({ a: a, b: b, c: c });
  let res = resolve({ a: { b: { c: fn } } });
  t.deepEqual(res('a.b.c', argA, argB, argC), {
    a: argA,
    b: argB,
    c: argC,
  });

  // get a.b.c property value
  const propertyValue = 'This is a test';
  res = resolve({ a: { b: { c: propertyValue } } });
  t.is(res('a.b.c'), propertyValue);
});
