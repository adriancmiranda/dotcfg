var is = require('./source/is');
var parse = require('./source/parse');
var read = require('./source/read');
var resolve = require('./source/resolve');
var assign = require('./source/assign');
var copyStrategyDefault = require('./source/strategies/copy-default');
var dotStrategyDefault = require('./source/strategies/dot-default');

var copyStrategy = assign(copyStrategyDefault);
var dotStrategy = assign(dotStrategyDefault);

function write(target, path, value, strategy){
  var id = 0;
  var dot = target;
  var opath = path;
  var keys = parse(path);
  var total = keys.length - 1;
  while (id < total) {
    path = keys[id++];
    if (is.objectLike(target[path])) {
      target = target[path];
    } else {
      target = target[path] = {};
    }
  }
  path = keys[id];
  if (is.undef(value)) delete target[path];
  else (target[path] = strategy(value, target[path], opath, keys));
  return dot;
}

function getCfg(target, copy) {
  target = copy ? copyStrategy({}, target) : target;
  delete target.namespace;
  delete target.cfg;
  delete target.exe;
  return target;
}

function uri(target, strategy) {
  dotStrategy = assign(strategy);
  return function(key, value, localStrategy) {
    var hasValue = arguments.length > 1;
    if (!key || key === true) return getCfg(target, key);
    if (is.objectLike(key)) return dotStrategy(target, key);
    localStrategy = is.defined(value) && is.fn(localStrategy) ? localStrategy : strategy;
    return hasValue ? write(target, key, value, localStrategy) : read(target, key);
  };
}

function stub(namespace, target, strategy) {
  if (is.objectLike(namespace)) {
    strategy = target;
    target = namespace;
  } else {
    target = is.objectLike(target) ? target : global;
    target = target[namespace] = target[namespace] || {};
    target.namespace = namespace;
  }
  target.cfg = uri(target, is.fn(strategy) ? strategy : dotStrategyDefault);
  target.exe = resolve(target);
  return target;
}

stub.strategy = dotStrategyDefault;
stub.assign = copyStrategy;

module.exports = stub;
