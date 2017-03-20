var parse = require('./parse');

module.exports = function(scope, path) {
  var id = 0;
  var keys = parse(path);
  var total = keys.length;
  while ((scope = scope[keys[id++]]) && id < total) {/*!*/}
  return id < total ? undefined : scope;
};
