import ava from 'ava';
import dotcfg from '../';

ava('get', t => {
	const i = dotcfg({ cfg: 'This is the settings' });
	t.is(i.cfg('test'), i.get('test'));
});
