var parse = require('./parse');

module.exports = function read(scope, path) {
  var id = 0, keys = parse(path), total = keys.length;
  while ((scope = scope[keys[id++]]) && id < total) {}
  return id < total ? undefined : scope;
};
