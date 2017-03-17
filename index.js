var is = require('./source/types');
var parse = require('./source/core/parse');
var read = require('./source/core/read');
var resolve = require('./source/core/resolve');
var assign = require('./source/core/assign');

var copyStrategy = assign(copyStrategyDefault);
var dotStrategy = assign(dotStrategyDefault);

function dotStrategyDefault(value) {
  return value;
}

function copyStrategyDefault(value, target) {
  if (Array.isArray(target)) {
    return target.concat(value);
  }
  return value;
}

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

function uri(target, dotStrategyDefault) {
  dotStrategy = assign(dotStrategyDefault);
  return function(key, value, strategy) {
    var hasValue = arguments.length > 1;
    if (!key || key === true) return getCfg(target, key);
    if (is.objectLike(key)) return dotStrategy(target, key);
    strategy = is.defined(value) && is.fn(strategy) ? strategy : dotStrategyDefault;
    return hasValue ? write(target, key, value, strategy) : read(target, key);
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
