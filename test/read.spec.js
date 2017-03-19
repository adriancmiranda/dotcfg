import ava from 'ava-spec';
import dotcfg from '../';
import read from '../source/read';

ava('read', t => {
  let i = dotcfg({ cfg: 'It doesn\'t replace the method itself.' });
  // t.is(i.cfg('cfg'), 'This is the settings');

  i = dotcfg({ settings: 'This is the settings' });
  t.is(i.cfg('settings'), 'This is the settings', 'simple property access works');

  i = dotcfg({ 'test.string.notation': 'works', arr: [1, 'b'] });
  t.is(i.cfg('arr[1]'), 'b', 'array access works');
  // t.is(i.cfg('[test.string.notation]'), 'works', 'string property access works');
  t.is(i.cfg('test.string.notation'), undefined, 'test.string.notation is undefined');
});
