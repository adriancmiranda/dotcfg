import ava from 'ava-spec';
import assert from 'assert';
import dotcfg from '../../source';

ava('new instance', t => {
//   const TEST_CHAIN = dotcfg({}).set('name', 'test').cfg('env', 'ava');
//   t.is(TEST_CHAIN.get('env'), 'ava');
//   t.deepEqual(TEST_CHAIN.cfg(), { name: 'test', env: 'ava' });
//   t.falsy(TEST_CHAIN instanceof dotcfg);

  const TEST_TYPE = dotcfg({});
  TEST_TYPE.set('name', 'test').cfg('env', 'ava')
  t.deepEqual(TEST_TYPE.cfg(), { name: 'test', env: 'ava' });
  // t.truthy(TEST_TYPE instanceof dotcfg); // @TODO < fix this

  const TEST_OBJ = dotcfg({});
  t.truthy(TEST_OBJ.cfg, 'instance.cfg function exists');
  t.truthy(TEST_OBJ.res, 'instance.res function exists');
  t.truthy(TEST_OBJ.exe, 'instance.exe function exists');
  t.truthy(TEST_OBJ.get, 'instance.get function exists');
  t.truthy(TEST_OBJ.set, 'instance.set function exists');

  const TEST_NS = dotcfg('TEST_NS');
  t.truthy(TEST_NS.cfg, 'instance.cfg function exists');
  t.truthy(TEST_NS.res, 'instance.res function exists');
  t.truthy(TEST_NS.exe, 'instance.exe function exists');
  t.truthy(TEST_NS.get, 'instance.get function exists');
  t.truthy(TEST_NS.set, 'instance.set function exists');

//   const SCOPE = { name: 'NS scope' };
//   const TEST_NS_SCOPE = dotcfg('TEST_NS', SCOPE);
//   TEST_NS_SCOPE.cfg('world', 'hello');
//   t.truthy(SCOPE.TEST_NS.world, 'NS scope');
});

ava('instance.override', t => {
  const obj = {
    res: 'my res property',
    exe: 'my exe property',
    cfg: 'my cfg property',
    get: 'my get property',
    set: 'my set property',
  };
  const TEST_NEW = new dotcfg(obj);

  t.truthy(typeof TEST_NEW.get('res') === 'function');
  t.is(TEST_NEW.get('@res'), 'my res property');

  t.truthy(typeof TEST_NEW.get('exe') === 'function');
  t.is(TEST_NEW.get('@exe'), 'my exe property');

  t.truthy(typeof TEST_NEW.get('cfg') === 'function');
  t.is(TEST_NEW.get('@cfg'), 'my cfg property');

  t.truthy(typeof TEST_NEW.get('get') === 'function');
  t.is(TEST_NEW.get('@get'), 'my get property');

  t.truthy(typeof TEST_NEW.get('set') === 'function');
  t.is(TEST_NEW.get('@set'), 'my set property');

  t.deepEqual(TEST_NEW.cfg(true), {
    res: 'my res property',
    exe: 'my exe property',
    cfg: 'my cfg property',
    get: 'my get property',
    set: 'my set property',
  }, 'getting everything cleaner');

  TEST_NEW.cfg('@res', 'res property change');
  // TEST_NEW.cfg('res', 10); // @TODO < fix this

  t.truthy(typeof TEST_NEW.get('res') === 'function');
  t.is(TEST_NEW.get('@res'), 'res property change');

  t.deepEqual(TEST_NEW.cfg(true), {
    res: 'res property change',
    exe: 'my exe property',
    cfg: 'my cfg property',
    get: 'my get property',
    set: 'my set property',
  }, 'getting everything cleaner');

  t.is(TEST_NEW.cfg(), obj);
});

// ava('instance.set', t => {
//   const i = dotcfg({});
//   t.is(i.cfg('test', 'test property value').cfg('test'), 'test property value');
//   t.is(i.cfg('another.property', 'another property value').cfg('another.property'), 'another property value');
// });

// ava('instance.get', t => {
//   const i = dotcfg({ name: 'instance.get' });
//   t.is(i.cfg('name'), 'instance.get');
//   t.is(i.cfg(true).name, 'instance.get', 'copy works');
//   t.is(i.cfg().name, 'instance.get');
// });

// ava('instance.assign', t => {
//   const common = dotcfg({ name: 'common' });
//   common.cfg('entry', 'entry common')
//   common.cfg('commonProp', 'common property');

//   const a = dotcfg({ name: 'instance a' });
//   a.cfg('entry', 'entry a');

//   const b = dotcfg(Object.create(null));

//   const merges = [a, b].map(config => {
//     return dotcfg.assign(common.cfg(true), config.cfg());
//   });

//   t.is(merges[0].commonProp, 'common property');
//   t.is(merges[0].entry, 'entry a');
//   t.is(merges[0].name, 'instance a');
//   t.is(merges[1].commonProp, 'common property');
//   t.is(merges[1].entry, 'entry common');
//   t.is(merges[1].name, 'common');
// });
