module.exports = function(strategy){
	return function(target){
	  var args = Array.prototype.slice.call(arguments);
	  var output = Object(target || {});
	  for (var ix = 1; ix < args.length; ix++) {
	    var from = args[ix];
	    var keys = Object.keys(Object(from));
	    var cpath;
	    for (var iy = 0; iy < keys.length; iy++) {
	      var key = cpath = keys[iy];
	      if (Array.isArray(output[key]) || Array.isArray(from[key])) {
	        var o = (Array.isArray(output[key]) ? output[key].slice() : []);
	        var f = (Array.isArray(from[key]) ? from[key].slice() : []);
	        output[key] = strategy(output[key], o.concat(f), cpath, keys);
	      } else if (is.fn(output[key]) || is.fn(from[key])) {
	        output[key] = strategy(output[key], from[key], cpath, keys);
	      } else if (is.object(output[key]) || is.object(from[key])) {
	        output[key] = assign(output[key], from[key]);
	      } else {
	        output[key] = strategy(output[key], from[key], cpath, keys);
	      }
	    }
	  }
	  return output;
	};
};
