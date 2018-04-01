import resolve from '../../source/core/resolve.js';

describe('#resolve', () => {
  it('resolve should be a Function', () => {
    expect(resolve).toEqual(jasmine.any(Function));
  });

  it('resolve', () => {
    let scope;
    // call a.b.c function with arguments 'argA', 'argB' and 'argC'
    const argA = 'argA';
    const argB = 'argB';
    const argC = 'argC';
    const fn = (a, b, c) => ({ a: a, b: b, c: c });
    scope = { a: { b: { c: fn } } };
    expect(resolve(scope, 'a.b.c', [argA, argB, argC])).toEqual({
      a: argA,
      b: argB,
      c: argC,
    });

    // get a.b.c property value
    const propertyValue = 'This is a test';
    scope = { a: { b: { c: propertyValue } } };
    expect(resolve(scope, 'a.b.c')).toEqual(propertyValue);
  });
});
