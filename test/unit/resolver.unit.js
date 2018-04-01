import resolver from '../../source/core/resolver.js';

describe('#resolver', () => {
  it('resolver should be a Function', () => {
    expect(resolver).toEqual(jasmine.any(Function));
  });

  it('resolver', () => {
    // call a.b.c function with arguments 'argA', 'argB' and 'argC'
    const argA = 'argA';
    const argB = 'argB';
    const argC = 'argC';
    const fn = (a, b, c) => ({ a: a, b: b, c: c });
    let res = resolver({ a: { b: { c: fn } } });
    expect(res('a.b.c', argA, argB, argC)).toEqual({
      a: argA,
      b: argB,
      c: argC,
    });

    // get a.b.c property value
    const propertyValue = 'This is a test';
    res = resolver({ a: { b: { c: propertyValue } } });
    expect(res('a.b.c')).toEqual(propertyValue);
  });
});
