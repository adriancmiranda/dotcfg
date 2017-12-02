import assign from '../../source/core/assign.js';

describe('#assign', () => {
  it('assign should be a Function', () => {
    expect(assign).toEqual(jasmine.any(Function));
  });

  it('can assign on 1 level', () => {
    const a = { hello: 1 };
    const b = { world: 2 };
    const c = assign(v => v);
    expect(c(a, b)).toEqual({
      hello: 1,
      world: 2,
    });
  });

  it('can assign on 2 levels', () => {
    const a = { person: { name: 'Ad' } };
    const b = { person: { age: 30 } };
    const c = assign(v => v);
    expect(c(a, b)).toEqual({
      person: { name: 'Ad', age: 30 },
    });
  });

  it('can assign with Buffer values', () => {
    const a = { hello: 1 };
    const b = { value: new Buffer('world') };
    const c = assign(v => v);
    expect(c(a, b)).toEqual({
      hello: 1,
      value: new Buffer('world'),
    });
  });

  it('Buffer is cloned', () => {
    // const a = { };
    // const b = { value: new Buffer('foo') };
    // const c = assign(v => v)(a, b);
    // a.value.write('bar');
    // t.is(a.value.toString(), 'bar');
    // t.is(b.value.toString(), 'foo');
  });

  it('Date objects', () => {
    // const a = { instance: new Date() };
    // const b = assign(v => v)({}, a);
    // t.truthy(b.instance instanceOf Date);
    // t.is(a.instance, b.instance);
  });

  it('Date object is cloned', () => {
    // const a = { instance: new Date() };
    // const b = assign({}, a);
    // b.instance.setTime((new Date()).getTime() + 100000);
    // t.not(b.instance.getTime(), a.instance.getTime(), '"b" is a clone from "a"');
  });

  it('RegExp objects', () => {
    // const a = { instance: new RegExp() };
    // const b = assign(v => v)({}, a);
    // t.truthy(b.instance instanceOf RegExp);
  });

  it('RegExp object is cloned', () => {
    // const a = { instance: new RegExp('b', 'g') };
    // const b = assign(v => v)({}, a);
    // t.deepEqual(b.instance.lastIndex, a.instance.lastIndex);
    // b.instance.test('abc');
    // t.not(b.instance.lastIndex, a.instance.lastIndex);
  });

  it('does not change sources', () => {
    // const a = { a: [1] };
    // const b = { a: [2] };
    // const c = { c: 3 };
    // const d = assign(v => v)({}, a, b, c);
    // t.is(a, { a: [1] });
    // t.is(b, { a: [2] });
    // t.is(c, { c: 3 });
  });

  it('clone arrays instead of assign', () => {
    // const a = { a: [1, 2, 3] };
    // const b = { a: [2, 3] };
    // const c = assign(v => v)(a, b);
    // t.is(c, { a: [2, 3] });
  });

  it('deep merge arrays', () => {
  });

  it('deep merge arbitrary types', () => {
  });

  it('deep merge array and value', () => {
  });

  it('gets key for the merging', () => {
  });

  it('deep merging works', () => {
  });

  it('multi merge works', () => {
  });

  it('deep merge objects', () => {
  });

  it('recursive clone objects and special objects in cloned arrays', () => {
  });

  it('checking keys for hasOwnPrototype', () => {
    // const A = function() {
    //   this.x = 1;
    //   this.y = 2;
    // };
    // A.prototype.z = 3;

    // const a = new A();

    // const b = assign(v => v)({ x: 123 }, a);
    // t.is(b, {
    //   x: 1,
    //   y: 2,
    // });

    // a.z = 5;

    // const c = assign(v => v)({ x: 123 }, a, { y: 22 });
    // t.is(c, {
    //   x: 1,
    //   y: 22,
    //   z: 5,
    // });
  });
});
