import ava from 'ava-spec';
import assert from 'assert';
import dotcfg from '../';

ava('new instance', t => {
  const TEST_CHAIN = dotcfg({}).cfg('name', 'test').cfg('env', 'ava');
  t.is(TEST_CHAIN.cfg('name'), 'test');
  t.truthy(TEST_CHAIN instanceof dotcfg);

  const TEST_OBJ = dotcfg({});
  t.truthy(TEST_OBJ.cfg, 'instance.cfg function exists');
  t.truthy(TEST_OBJ.resolve, 'instance.resolve function exists');
  t.truthy(TEST_OBJ.exe, 'instance.exe function exists');

  const TEST_NS = dotcfg('TEST_NS');
  t.truthy(TEST_NS.cfg, 'instance.cfg function exists');
  t.truthy(TEST_NS.resolve, 'instance.resolve function exists');
  t.truthy(TEST_NS.exe, 'instance.exe function exists');

  const SCOPE = { name: 'NS scope' };
  const TEST_NS_SCOPE = dotcfg('TEST_NS', SCOPE);
  TEST_NS_SCOPE.cfg('world', 'hello');
  t.truthy(SCOPE.TEST_NS.world, 'NS scope');

  const TEST_NEW = new dotcfg({ cfg: 'Fixed property methods' });
  t.is(TEST_NEW.cfg('cfg'), 'Fixed property methods');
});

ava('instance.set', t => {
  const i = dotcfg({});
  t.is(i.cfg('test', 'test property value').cfg('test'), 'test property value');
  t.is(i.cfg('another.property', 'another property value').cfg('another.property'), 'another property value');
});

ava('instance.get', t => {
  const i = dotcfg({ name: 'instance.get' });
  t.is(i.cfg('name'), 'instance.get');
  t.is(i.cfg(true).name, 'instance.get', 'copy works');
  t.is(i.cfg().name, 'instance.get');
});

ava('instance.assign', t => {
  const common = dotcfg({ name: 'common' });
  common.cfg('entry', 'entry common')
  common.cfg('commonProp', 'common property');

  const a = dotcfg({ name: 'instance a' });
  a.cfg('entry', 'entry a');

  const b = dotcfg(Object.create(null));

  const merges = [a, b].map(config => {
    return dotcfg.assign(common.cfg(true), config.cfg());
  });

  t.is(merges[0].commonProp, 'common property');
  t.is(merges[0].entry, 'entry a');
  t.is(merges[0].name, 'instance a');
  t.is(merges[1].commonProp, 'common property');
  t.is(merges[1].entry, 'entry common');
  t.is(merges[1].name, 'common');
});
