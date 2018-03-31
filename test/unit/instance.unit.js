import assert from 'assert';
import DotCfg from '../../source/index.js';

describe('instance', () => {
  it('DotCfg should be a Function', () => {
    expect(DotCfg).toEqual(jasmine.any(Function));
  });

  it('new instance', () => {
    const chainable = DotCfg({}).set('name', 'test').cfg('env', 'ava');
    expect(chainable.get('env')).toEqual('ava');
    expect(chainable.cfg()).toEqual({ name: 'test', env: 'ava' });
    // t.falsy(chainable instanceof DotCfg);

    // const TEST_TYPE = DotCfg({});
    // TEST_TYPE.set('name', 'test').cfg('env', 'ava');
    // expect(TEST_TYPE.cfg()).toEqual({ name: 'test', env: 'ava' });
    // // t.truthy(TEST_TYPE instanceof DotCfg); // @TODO < fix this

    // const TEST_OBJ = DotCfg({});
    // expect(TEST_OBJ.cfg).toEqual(jasmine.any(Function), 'instance.cfg function exists');
    // expect(TEST_OBJ.res).toEqual(jasmine.any(Function), 'instance.res function exists');
    // expect(TEST_OBJ.exe).toEqual(jasmine.any(Function), 'instance.exe function exists');
    // expect(TEST_OBJ.get).toEqual(jasmine.any(Function), 'instance.get function exists');
    // expect(TEST_OBJ.set).toEqual(jasmine.any(Function), 'instance.set function exists');

    // const TEST_NS = DotCfg('TEST_NS');
    // expect(TEST_NS.cfg).toEqual(jasmine.any(Function), 'instance.cfg function exists');
    // expect(TEST_NS.res).toEqual(jasmine.any(Function), 'instance.res function exists');
    // expect(TEST_NS.exe).toEqual(jasmine.any(Function), 'instance.exe function exists');
    // expect(TEST_NS.get).toEqual(jasmine.any(Function), 'instance.get function exists');
    // expect(TEST_NS.set).toEqual(jasmine.any(Function), 'instance.set function exists');

    // // const SCOPE = { name: 'NS scope' };
    // // const TEST_NS_SCOPE = DotCfg('TEST_NS', SCOPE);
    // // TEST_NS_SCOPE.cfg('world', 'hello');
    // // t.truthy(SCOPE.TEST_NS.world, 'NS scope');
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
