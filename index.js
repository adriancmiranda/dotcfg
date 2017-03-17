var is = require('./source/types');
var parse = require('./source/core/parse');
var read = require('./source/core/read');
var resolve = require('./source/core/resolve');

var assignStrategy;
function dotStrategy(value) {
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

function assign(target){
  var args = Array.prototype.slice.call(arguments);
  var output = Object(target || {});
  for (var ix = 1; ix < args.length; ix++) {
    var from = args[ix];
    var keys = Object.keys(Object(from));
    var cpath;
    for (var iy = 0; iy < keys.length; iy++) {
      var key = cpath = keys[iy];
      if (Array.isArray(output[key]) || Array.isArray(from[key])) {
        var o = Array.isArray(output[key]) ? output[key].slice() : [];
        var f = Array.isArray(from[key]) ? from[key].slice() : [];
        output[key] = assignStrategy(output[key], o.concat(f), cpath, keys);
      } else if (is.fn(output[key]) || is.fn(from[key])) {
        output[key] = assignStrategy(output[key], from[key], cpath, keys);
      } else if (is.object(output[key]) || is.object(from[key])) {
        output[key] = assign(output[key], from[key]);
      } else {
        output[key] = assignStrategy(output[key], from[key], cpath, keys);
      }
    }
  }
  return output;
}

function getCfg(target, copy) {
  target = copy ? assign({}, target) : target;
  delete target.namespace;
  delete target.cfg;
  delete target.exe;
  return target;
}

function uri(target, defaultStrategy) {
  assignStrategy = defaultStrategy;
  return function(key, value, strategy) {
    var hasValue = arguments.length > 1;
    if (!key || key === true) return getCfg(target, key);
    if (is.objectLike(key)) return assign(target, key);
    strategy = is.defined(value) && is.fn(strategy) ? strategy : defaultStrategy;
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
  target.cfg = uri(target, is.fn(strategy) ? strategy : dotStrategy);
  target.exe = resolve(target);
  return target;
}

stub.strategy = dotStrategy;
stub.assign = assign;

module.exports = stub;
