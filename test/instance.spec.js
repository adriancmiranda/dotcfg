import ava from 'ava-spec';
import assert from 'assert';
import dotcfg from '../';

ava('new instance', t => {
  const TEST_OBJ = dotcfg({});
  t.truthy(TEST_OBJ.cfg, 'instance.cfg function exists');
  t.truthy(TEST_OBJ.exe, 'instance.exe function exists');

  const TEST_NS = dotcfg('TEST_NS');
  t.truthy(TEST_NS.cfg, 'instance.cfg function exists');
  t.truthy(TEST_NS.exe, 'instance.exe function exists');
});

ava('instance.set', t => {
  const i = dotcfg({});
  t.is(i.cfg('test', 'test property value').test, 'test property value');
  t.is(i.cfg('another.property', 'another property value').another.property, 'another property value');
});

ava('instance.get', t => {
  const i = dotcfg({ name: 'instance.get' });
  t.is(i.cfg('name'), 'instance.get');
  t.is(i.cfg(true).name, 'instance.get', 'copy works');
  t.is(i.cfg().name, 'instance.get');
  t.is(i.cfg, undefined);
  t.is(i.exe, undefined);
});

ava('instance.assign', t => {
  const common = dotcfg({ name: 'common' });
  common.cfg('entry', 'entry common')
  common.cfg('commonProp', 'common property');

  const a = dotcfg({ name: 'a' });
  a.cfg('entry', 'entry a');

  const b = dotcfg(Object.create(null));

  const merges = [a, b].map(config => {
    return dotcfg.assign(common.cfg(true), config.cfg());
  });

  t.is(merges[0].commonProp, 'common property');
  t.is(merges[0].entry, 'entry a');
  t.is(merges[0].name, 'a');
  t.is(merges[1].commonProp, 'common property');
  t.is(merges[1].entry, 'entry common');
  t.is(merges[1].name, 'common');
});
