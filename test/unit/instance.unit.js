import assert from 'assert';
import * as configFixture from 'fixtures/config.fixture.js';
import DotCfg from '../../source/index.js';

describe('instance', () => {
  it('DotCfg should be a Function', () => {
    expect(DotCfg).toEqual(jasmine.any(Function));
  });

  it('new instance', () => {
    const dotChain = DotCfg({}).set('name', 'test').cfg('env', 'ava');
    expect(dotChain.get('env')).toEqual('ava', 'should return the `env` variable value');
    expect(dotChain.cfg()).toEqual({ name: 'test', env: 'ava' }, 'should return the `dotChain` raw object');
    expect(dotChain instanceof DotCfg).toBe(true);

    const dotType = DotCfg({});
    dotType.set('name', 'test').cfg('env', 'ava');
    expect(dotType.cfg()).toEqual({ name: 'test', env: 'ava' }, 'should return the `dotType` raw object');
    expect(dotType instanceof DotCfg).toBe(true, 'should be an instanceof DotCfg');

    const dotObject = DotCfg({});
    expect(dotObject.set).toEqual(jasmine.any(Function), 'instance.set function exists');
    expect(dotObject.get).toEqual(jasmine.any(Function), 'instance.get function exists');
    expect(dotObject.res).toEqual(jasmine.any(Function), 'instance.res function exists');
    expect(dotObject.cfg).toEqual(jasmine.any(Function), 'instance.cfg function exists');

    const dotNamespace = DotCfg('TEST_NS');
    expect(dotNamespace.cfg).toEqual(jasmine.any(Function), 'instance.cfg function exists');
    expect(dotNamespace.res).toEqual(jasmine.any(Function), 'instance.res function exists');
    expect(dotNamespace.get).toEqual(jasmine.any(Function), 'instance.get function exists');
    expect(dotNamespace.set).toEqual(jasmine.any(Function), 'instance.set function exists');

    const scope = { name: 'NS scope' };
    const dotNamespaceScope = new DotCfg('TEST_NS', scope);
    dotNamespaceScope.cfg('world', 'hello');
    expect(dotNamespaceScope.scope.world).toEqual('hello', 'cfg method write on dotcfg scope');
    expect(dotNamespaceScope.scope.name).toEqual(undefined, 'cfg method doesn\'t see outside of scope');
    expect(dotNamespaceScope.get('TEST_NS')).toEqual(undefined, 'get method doesn\'t see the namespace object');
    expect(dotNamespaceScope.get('world')).toEqual('hello', 'get should see any scope variable');
    expect(dotNamespaceScope.get('name')).toEqual(undefined, 'get method doesn\'t see outside of scope');
    expect(scope.name).toEqual('NS scope', 'dotcfg shouldn\'t affect variables outside of scope');
    expect(scope.TEST_NS).toEqual(jasmine.any(Object), 'dotcfg should create an namespace object');
    expect(scope.TEST_NS.world).toEqual('hello', 'dotcfg should affect the namespace object');
  });

  it('new normalized instance', () => {
    const uri = configFixture.data['server.db.uri'];
    const dot = DotCfg(configFixture.data);
    expect(dot.get('server')).toEqual(jasmine.any(Object), '`server` should be an object');
    expect(dot.get('server.db')).toEqual(jasmine.any(Object), '`server.db` should be an object');
    expect(dot.get('server.db.uri')).toEqual(uri, `\`server.db.uri\` should be ${uri}`);
  });

 it('instance.override', () => {
    const scope = {
      res: 'my res property',
      cfg: 'my cfg property',
      get: 'my get property',
      set: 'my set property',
    };
    const dotNu = new DotCfg(scope);
    expect(dotNu.get('res')).toEqual(scope.res);
    expect(dotNu.get('cfg')).toEqual(scope.cfg);
    expect(dotNu.get('get')).toEqual(scope.get);
    expect(dotNu.get('set')).toEqual(scope.set);
    expect(dotNu.cfg(true)).toEqual(scope, 'getting everything cleaner');

    dotNu.cfg('res', 'res property changed');
    expect(dotNu.get('res')).toEqual('res property changed');

    expect(dotNu.cfg(true)).toEqual({
      res: 'res property changed',
      cfg: 'my cfg property',
      get: 'my get property',
      set: 'my set property',
    }, 'getting everything cleaner');

    expect(dotNu.cfg()).toEqual(scope);
  });

  it('instance.cfg.set', () => {
    const i = DotCfg({});
    expect(i.cfg('test', 'test property value').cfg('test')).toEqual('test property value');
    expect(i.cfg('another.property', 'another property value').cfg('another.property')).toEqual('another property value');
  });

  it('instance.cfg.get', () => {
    const i = DotCfg({ name: 'instance.get' });
    expect(i.cfg('name')).toEqual('instance.get');
    expect(i.cfg(true).name).toEqual('instance.get', 'copy works');
    expect(i.cfg().name).toEqual('instance.get');
  });

  it('instance.assign', () => {
    const common = DotCfg({ name: 'common' });
    common.cfg('entry', 'entry common')
    common.cfg('commonProp', 'common property');

    const a = DotCfg({ name: 'instance a' });
    a.cfg('entry', 'entry a');

    const b = DotCfg(Object.create(null));

    const merges = [a, b].map(config => {
      return DotCfg.assign(common.cfg(true), config.cfg());
    });

    expect(merges[0].commonProp).toEqual('common property');
    expect(merges[0].entry).toEqual('entry a');
    expect(merges[0].name).toEqual('instance a');
    expect(merges[1].commonProp).toEqual('common property');
    expect(merges[1].entry).toEqual('entry common');
    expect(merges[1].name).toEqual('common');
  });
});
