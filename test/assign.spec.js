import ava from 'ava-spec';
import assign from '../source/assign';

ava('assign:can extend on 1 level', t => {
  const a = { hello: 1 };
  const b = { world: 2 };
  const c = assign(v => v);
  t.deepEqual(c(a, b), {
    hello: 1,
    world: 2,
  });
});

ava('assign:can extend on 2 levels', t => {
  const a = { person: { name: 'Ad' } };
  const b = { person: { age: 30 } };
  const c = assign(v => v);
  t.deepEqual(c(a, b), {
    person: { name: 'Ad', age: 30 },
  });
});

ava('assign:can extend with Buffer values', t => {
  const a = { hello: 1 };
  const b = { value: new Buffer('world') };
  const c = assign(v => v);
  t.deepEqual(c(a, b), {
    hello: 1,
    value: new Buffer('world'),
  });
});

ava('assign:Buffer is cloned', t => {
  // const a = { };
  // const b = { value: new Buffer('foo') };
  // const c = assign(v => v)(a, b);
  // a.value.write('bar');
  // t.is(a.value.toString(), 'bar');
  // t.is(b.value.toString(), 'foo');
});

ava('assign:Date objects', t => {
  // const a = { d: new Date() };
  // const b = assign(v => v)({}, a);
  // t.truthy(b.d instanceOf Date);
  // t.is(a.d, b.d);
});

ava('assign:Date object is cloned', t => {
});

ava('assign:RegExp objects', t => {
  // const a = { d: new RegExp() };
  // const b = assign(v => v)({}, a);
  // t.truthy(b.d instanceOf RegExp);
});

ava('assign:RegExp object is cloned', t => {
  // const a = { d: new RegExp('b', 'g') };
  // const b = assign(v => v)({}, a);
  // t.deepEqual(b.d.lastIndex, a.d.lastIndex);
  // b.d.test('abc');
  // t.not(b.d.lastIndex, a.d.lastIndex);
});

ava('assign:does not change sources', t => {
  // const a = { a: [1] };
  // const b = { a: [2] };
  // const c = { c: 3 };
  // const d = assign(v => v)({}, a, b, c);
  // t.is(a, { a: [1] });
  // t.is(b, { a: [2] });
  // t.is(c, { c: 3 });
});

ava('assign:clone arrays instead of extend', t => {
  // const a = { a: [1, 2, 3] };
  // const b = { a: [2, 3] };
  // const c = assign(v => v)(a, b);
  // t.is(c, { a: [2, 3] });
});

ava('assign:deep merge arrays', t => {
});

ava('assign:deep merge arbitrary types', t => {
});

ava('assign:deep merge array and value', t => {
});

ava('assign:gets key for the merging', t => {
});

ava('assign:deep merging works', t => {
});

ava('assign:multi merge works', t => {
});

ava('assign:deep merge objects', t => {
});

ava('assign:recursive clone objects and special objects in cloned arrays', t => {
});

ava('assign:checking keys for hasOwnPrototype', t => {
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
