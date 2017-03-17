import ava from 'ava';
import assert from 'assert';
import dotcfg from '../';

ava('new instance', t => {
  const i = dotcfg({});
  t.truthy(i.cfg, 'instance.cfg function exists');
});

ava('instance.set', t => {
  const i = dotcfg({});
  t.is(i.cfg('test', 'test property value').test, 'test property value');
  t.is(i.cfg('another.property', 'another property value').another.property, 'another property value');
});

ava('instance.get', t => {
  const i = dotcfg({ name: 'instance.get' });
  t.is(i.cfg('name'), 'instance.get');
  // t.is(i.cfg(true).name, 'instance.get', 'copy works');
  // t.is(i.cfg().name, 'instance.get');
  // t.is(i.cfg, undefined);
  // t.is(i.exe, undefined);
});

ava('instance.assign', t => {
  const common = dotcfg({ name: 'common' });
  common.cfg('commonProp', 'common property');

  const a = dotcfg({ name: 'a' });
  a.cfg('entry', 'entry a');

  const b = dotcfg({ name: 'b' });
  b.cfg('entry', 'entry b');

  const merges = [a, b].map(config => {
    return dotcfg.assign(common.cfg(true), config.cfg());
  });

  // t.is(merges[0].commonProp, 'common property');
  // t.is(merges[0].entry, 'entry a');
  // t.is(merges[1].commonProp, 'common property');
  // t.is(merges[1].entry, 'entry b');
});
