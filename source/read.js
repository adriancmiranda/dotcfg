var parse = require('./parse');

module.exports = function(scope, notation) {
  var id = 0;
  var keys = parse(notation);
  var total = keys.length;
  while ((scope = scope[keys[id++]]) && id < total) {/*!*/}
  return id < total ? undefined : scope;
};
