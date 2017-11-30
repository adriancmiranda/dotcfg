import proxy from './proxy';

export default function validate(scope, instance, fns) {
	const cache = {};
	const acc = '@';
	for (let id = 0, key; id < fns.length; id += 1) {
		key = fns[id];
		if (scope[key]) {
			scope[acc + key] = scope[key];
			cache[key] = scope[key];
		}
		scope[key] = proxy(instance[key], instance);
	}
	return function (flush) {
		if (flush) {
			for (let id = 0, key; id < fns.length; id += 1) {
				key = fns[id];
				if (cache[key]) {
					scope[key] = cache[key];
					delete scope[acc + key];
				} else {
					delete scope[key];
				}
			}
		}
		return scope;
	};
}
