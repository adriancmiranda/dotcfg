import resolve from '../../source/core/resolve.js';

describe('#resolve', () => {
  it('resolve should be a Function', () => {
    expect(resolve).toEqual(jasmine.any(Function));
  });

  it('resolve', () => {
    // call a.b.c function with arguments 'argA', 'argB' and 'argC'
    const argA = 'argA';
    const argB = 'argB';
    const argC = 'argC';
    const fn = (a, b, c) => ({ a: a, b: b, c: c });
    let res = resolve({ a: { b: { c: fn } } });
    expect(res('a.b.c', argA, argB, argC)).toEqual({
      a: argA,
      b: argB,
      c: argC,
    });

    // get a.b.c property value
    const propertyValue = 'This is a test';
    res = resolve({ a: { b: { c: propertyValue } } });
    expect(res('a.b.c')).toEqual(propertyValue);
  });
});
