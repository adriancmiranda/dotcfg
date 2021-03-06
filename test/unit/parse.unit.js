import parse from '../../source/core/parse.js';

function deepEqual(method, trace) {
  const fn = method ? parse[method] : parse;
  trace && console.log('--');
  return (path, val) => {
    const args = toString.call(path) === '[object RegExp]'
    ? '(/'+ path.source +'/'+ path.flags +')'
    : '('+ JSON.stringify(path) +')';
    return expect((() => {
      const keys = fn(path);
      trace && console.info(`  ${
        method ? method + args : path
      }:`, keys);
      return keys;
    })()).toEqual(val);
  };
}

describe('#parse', () => {
  it('parse should be a Function', () => {
    expect(parse).toEqual(jasmine.any(Function));
  });

  it('parse.notation', () => {
    const eq = deepEqual('notation');
    const backslash = '\ '.replace(' ', '');
    eq('test[1][2].ab[spec.3]', ['test[1][2]', 'ab[spec.3]']);
    eq('test[1][2].ab[3]', ['test[1][2]', 'ab[3]']);
    eq('x.1.y[2].z.3', ['x', '1', 'y[2]', 'z', '3']);
    eq('test.ab[1].spec', ['test', 'ab[1]', 'spec']);
    eq('test. .key', ['test', ' ', 'key']);
    eq('test.12.key', ['test', '12', 'key']);
    eq('test.ab.key', ['test', 'ab', 'key']);
    eq('test..empty', ['test', '', 'empty']);
    eq('test.\.empty', ['test', backslash, 'empty']);
    eq('test./.empty', ['test', '/', 'empty']);
    eq('test...rest', ['test', '', '', 'rest']);
    eq('test.💩.char', ['test', '💩', 'char']);
    eq('test.ab', ['test', 'ab']);
    eq('test', ['test']);
    eq('[0]', ['[0]']);
    eq('[1]', ['[1]']);
    eq('[]', ['[]']);
    eq('[ab]', ['[ab]']);
    eq('[ab', ['[ab']);
    eq('[', ['[']);
    eq(['a', 1, {}], ['a', 1, {}]);
    eq(/test\.ab/, []);
    eq(/test.ab/gi, []);
    eq({}, []);
    eq(undefined, []);
    eq(null, []);
    eq('', ['']);
  });

  it('parse', () => {
    const eq = deepEqual();
    eq('test.12[1][a.b.c].spec', ['test', 12, 1, 'a.b.c', 'spec']);
    eq('sample["teste"]', ['sample', '"teste"']);
    eq('sample[""teste""]', ['sample', '""teste""']);
    eq('sample[""teste]', ['sample', '""teste']);
    eq('sample.another[\'teste\']', ['sample', 'another', '\'teste\'']);
    eq("sample.another['teste']", ['sample', 'another', '\'teste\'']);
    eq('sample[]', ['sample', '']);
    eq('[test[ab]]', ['test[ab]']);
    eq('[0]', [0]);
    eq('[1]', [1]);
    eq('[]', ['']);
    eq('[ab]', ['ab']);
    eq('[ab', ['[ab']);
    eq('[', ['[']);
  });
});
