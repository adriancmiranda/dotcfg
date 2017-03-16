import ava from 'ava';
import assert from 'assert';
import dotcfg from '../';

ava('creation', t => {
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
});
