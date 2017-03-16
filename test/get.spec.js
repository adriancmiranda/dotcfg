import ava from 'ava';
import dotcfg from '../';

ava('get', t => {
	let i = dotcfg({ cfg: 'It doesn\'t replace the method itself.' });
	// t.is(i.cfg('cfg'), 'This is the settings');

  i = dotcfg({ settings: 'This is the settings' });
  t.is(i.cfg('settings'), 'This is the settings');
});
