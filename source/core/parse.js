var spaces = /\s/g;
var objectAssessor = /\[(["']?)([^\1]+?)\1?\]/g;
var startWithDot = /^\./;

function replacer(match, p1, p2) {
  return (isNaN(p2) ? ' ' : '.') + p2;
}

module.exports = function(path) {
  var keys = path.replace(spaces, '').replace(objectAssessor, replacer);
  keys = keys.replace(startWithDot, '').split(spaces);
  keys = keys.length > 1 ? keys.filter(String) : keys[0].split('.');
  return keys;
};
