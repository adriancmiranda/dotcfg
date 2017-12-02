import assert from 'assert';
import dotcfg from '../../source/index.js';

describe('dotcfg', () => {
  it('dotcfg should be a Function', () => {
    expect(dotcfg).toEqual(jasmine.any(Function));
  });

  it('new instance', () => {
    // const TEST_CHAIN = dotcfg({}).set('name', 'test').cfg('env', 'ava');
    // t.is(TEST_CHAIN.get('env'), 'ava');
    // t.deepEqual(TEST_CHAIN.cfg(), { name: 'test', env: 'ava' });
    // t.falsy(TEST_CHAIN instanceof dotcfg);

    const TEST_TYPE = dotcfg({});
    TEST_TYPE.set('name', 'test').cfg('env', 'ava');
    expect(TEST_TYPE.cfg()).toEqual({ name: 'test', env: 'ava' });
    // t.truthy(TEST_TYPE instanceof dotcfg); // @TODO < fix this

    const TEST_OBJ = dotcfg({});
    expect(TEST_OBJ.cfg).toEqual(jasmine.any(Function), 'instance.cfg function exists');
    expect(TEST_OBJ.res).toEqual(jasmine.any(Function), 'instance.res function exists');
    expect(TEST_OBJ.exe).toEqual(jasmine.any(Function), 'instance.exe function exists');
    expect(TEST_OBJ.get).toEqual(jasmine.any(Function), 'instance.get function exists');
    expect(TEST_OBJ.set).toEqual(jasmine.any(Function), 'instance.set function exists');

    const TEST_NS = dotcfg('TEST_NS');
    expect(TEST_NS.cfg).toEqual(jasmine.any(Function), 'instance.cfg function exists');
    expect(TEST_NS.res).toEqual(jasmine.any(Function), 'instance.res function exists');
    expect(TEST_NS.exe).toEqual(jasmine.any(Function), 'instance.exe function exists');
    expect(TEST_NS.get).toEqual(jasmine.any(Function), 'instance.get function exists');
    expect(TEST_NS.set).toEqual(jasmine.any(Function), 'instance.set function exists');

    // const SCOPE = { name: 'NS scope' };
    // const TEST_NS_SCOPE = dotcfg('TEST_NS', SCOPE);
    // TEST_NS_SCOPE.cfg('world', 'hello');
    // t.truthy(SCOPE.TEST_NS.world, 'NS scope');
  });

 dotcfg('instance.override', () => {
    const obj = {
      res: 'my res property',
      exe: 'my exe property',
      cfg: 'my cfg property',
      get: 'my get property',
      set: 'my set property',
    };
    const TEST_NEW = new dotcfg(obj);

    expect(TEST_NEW.get('res')).toEqual(jasmine.any(Function));
    expect(TEST_NEW.get('@res')).toEqual('my res property');

    expect(TEST_NEW.get('exe')).toEqual(jasmine.any(Function));
    expect(TEST_NEW.get('@exe')).toEqual('my exe property');

    expect(TEST_NEW.get('cfg')).toEqual(jasmine.any(Function));
    expect(TEST_NEW.get('@cfg')).toEqual('my cfg property');

    expect(TEST_NEW.get('get')).toEqual(jasmine.any(Function));
    expect(TEST_NEW.get('@get')).toEqual('my get property');

    expect(TEST_NEW.get('set')).toEqual(jasmine.any(Function));
    expect(TEST_NEW.get('@set')).toEqual('my set property');

    expect(TEST_NEW.cfg(true)).toEqual({
      res: 'my res property',
      exe: 'my exe property',
      cfg: 'my cfg property',
      get: 'my get property',
      set: 'my set property',
    }, 'getting everything cleaner');

    TEST_NEW.cfg('@res', 'res property change');
    // TEST_NEW.cfg('res', 10); // @TODO < fix this

    expect(TEST_NEW.get('res')).toEqual(jasmine.any(Function));
    expect(TEST_NEW.get('@res')).toEqual('res property change');

    expect(TEST_NEW.cfg(true)).toEqual({
      res: 'res property change',
      exe: 'my exe property',
      cfg: 'my cfg property',
      get: 'my get property',
      set: 'my set property',
    }, 'getting everything cleaner');

    expect(TEST_NEW.cfg()).toEqual(obj);
  });

  // it('instance.set', () => {
    // const i = dotcfg({});
    // t.is(i.cfg('test', 'test property value').cfg('test'), 'test property value');
    // t.is(i.cfg('another.property', 'another property value').cfg('another.property'), 'another property value');
  // });

  // it('instance.get', () => {
    // const i = dotcfg({ name: 'instance.get' });
    // t.is(i.cfg('name'), 'instance.get');
    // t.is(i.cfg(true).name, 'instance.get', 'copy works');
    // t.is(i.cfg().name, 'instance.get');
  // });

  // it('instance.assign', () => {
    // const common = dotcfg({ name: 'common' });
    // common.cfg('entry', 'entry common')
    // common.cfg('commonProp', 'common property');

    // const a = dotcfg({ name: 'instance a' });
    // a.cfg('entry', 'entry a');

    // const b = dotcfg(Object.create(null));

    // const merges = [a, b].map(config => {
    //   return dotcfg.assign(common.cfg(true), config.cfg());
    // });

    // t.is(merges[0].commonProp, 'common property');
    // t.is(merges[0].entry, 'entry a');
    // t.is(merges[0].name, 'instance a');
    // t.is(merges[1].commonProp, 'common property');
    // t.is(merges[1].entry, 'entry common');
    // t.is(merges[1].name, 'common');
  // });
});
