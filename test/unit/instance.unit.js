import assert from 'assert';
import DotCfg from '../../source/index.js';

describe('instance', () => {
  it('DotCfg should be a Function', () => {
    expect(DotCfg).toEqual(jasmine.any(Function));
  });

  it('new instance', () => {
    const testChain = DotCfg({}).set('name', 'test').cfg('env', 'ava');
    expect(testChain.get('env')).toEqual('ava');
    expect(testChain.cfg()).toEqual({ name: 'test', env: 'ava' });
    expect(testChain instanceof DotCfg).toBe(true);

    const testType = DotCfg({});
    testType.set('name', 'test').cfg('env', 'ava');
    expect(testType.cfg()).toEqual({ name: 'test', env: 'ava' });
    expect(testType instanceof DotCfg).toBe(true);

    const testObject = DotCfg({});
    expect(testObject.set).toEqual(jasmine.any(Function), 'instance.set function exists');
    expect(testObject.get).toEqual(jasmine.any(Function), 'instance.get function exists');
    expect(testObject.res).toEqual(jasmine.any(Function), 'instance.res function exists');
    expect(testObject.cfg).toEqual(jasmine.any(Function), 'instance.cfg function exists');

    const testNamespace = DotCfg('TEST_NS');
    expect(testNamespace.cfg).toEqual(jasmine.any(Function), 'instance.cfg function exists');
    expect(testNamespace.res).toEqual(jasmine.any(Function), 'instance.res function exists');
    expect(testNamespace.get).toEqual(jasmine.any(Function), 'instance.get function exists');
    expect(testNamespace.set).toEqual(jasmine.any(Function), 'instance.set function exists');

    // const scope = { name: 'NS scope' };
    // const testNamespaceScope = DotCfg('TEST_NS', scope);
    // testNamespaceScope.cfg('world', 'hello');
    // expect(scope.TEST_NS.world).toEqual('NS scope');
  });

 // it('instance.override', () => {
 //    const obj = {
 //      res: 'my res property',
 //      exe: 'my exe property',
 //      cfg: 'my cfg property',
 //      get: 'my get property',
 //      set: 'my set property',
 //    };
 //    const TEST_NEW = new DotCfg(obj);

 //    expect(TEST_NEW.get('res')).toEqual(jasmine.any(Function));
 //    expect(TEST_NEW.get('@res')).toEqual('my res property');

 //    expect(TEST_NEW.get('exe')).toEqual(jasmine.any(Function));
 //    expect(TEST_NEW.get('@exe')).toEqual('my exe property');

 //    expect(TEST_NEW.get('cfg')).toEqual(jasmine.any(Function));
 //    expect(TEST_NEW.get('@cfg')).toEqual('my cfg property');

 //    expect(TEST_NEW.get('get')).toEqual(jasmine.any(Function));
 //    expect(TEST_NEW.get('@get')).toEqual('my get property');

 //    expect(TEST_NEW.get('set')).toEqual(jasmine.any(Function));
 //    expect(TEST_NEW.get('@set')).toEqual('my set property');

 //    expect(TEST_NEW.cfg(true)).toEqual({
 //      res: 'my res property',
 //      exe: 'my exe property',
 //      cfg: 'my cfg property',
 //      get: 'my get property',
 //      set: 'my set property',
 //    }, 'getting everything cleaner');

 //    TEST_NEW.cfg('@res', 'res property change');
 //    // TEST_NEW.cfg('res', 10); // @TODO < fix this

 //    expect(TEST_NEW.get('res')).toEqual(jasmine.any(Function));
 //    expect(TEST_NEW.get('@res')).toEqual('res property change');

 //    expect(TEST_NEW.cfg(true)).toEqual({
 //      res: 'res property change',
 //      exe: 'my exe property',
 //      cfg: 'my cfg property',
 //      get: 'my get property',
 //      set: 'my set property',
 //    }, 'getting everything cleaner');

 //    expect(TEST_NEW.cfg()).toEqual(obj);
 //  });

  // it('instance.set', () => {
    // const i = DotCfg({});
    // t.is(i.cfg('test', 'test property value').cfg('test'), 'test property value');
    // t.is(i.cfg('another.property', 'another property value').cfg('another.property'), 'another property value');
  // });

  // it('instance.get', () => {
    // const i = DotCfg({ name: 'instance.get' });
    // t.is(i.cfg('name'), 'instance.get');
    // t.is(i.cfg(true).name, 'instance.get', 'copy works');
    // t.is(i.cfg().name, 'instance.get');
  // });

  // it('instance.assign', () => {
    // const common = DotCfg({ name: 'common' });
    // common.cfg('entry', 'entry common')
    // common.cfg('commonProp', 'common property');

    // const a = DotCfg({ name: 'instance a' });
    // a.cfg('entry', 'entry a');

    // const b = DotCfg(Object.create(null));

    // const merges = [a, b].map(config => {
    //   return DotCfg.assign(common.cfg(true), config.cfg());
    // });

    // t.is(merges[0].commonProp, 'common property');
    // t.is(merges[0].entry, 'entry a');
    // t.is(merges[0].name, 'instance a');
    // t.is(merges[1].commonProp, 'common property');
    // t.is(merges[1].entry, 'entry common');
    // t.is(merges[1].name, 'common');
  // });
});
