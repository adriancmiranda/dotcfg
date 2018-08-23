import keys from 'describe-type/ponyfill/Object.keys.next.js';
import slice from 'describe-type/internal/slice.next.js';
import array from 'describe-type/is/array/index.next.js';
import object from 'describe-type/is/object/index.next.js';
import callable from 'describe-type/is/callable.next.js';

export default (strategy) => {
	let notation = '';
	return function assign(target) {
		const args = slice(arguments);
		const output = target == null ? {} : target;
		for (let ix = 1; ix < args.length; ix += 1) {
			const from = args[ix];
			const keyList = keys(from);
			for (let iy = 0; iy < keyList.length; iy += 1) {
				const key = keyList[iy];
				const outputValue = output[key];
				const sourceValue = from[key];
				if (array(outputValue) || array(sourceValue)) {
					const f = slice(sourceValue);
					const o = slice(outputValue);
					output[key] = strategy(f, o, `${notation}.${key}`, keyList);
				} else if (callable(outputValue) || callable(sourceValue)) {
					output[key] = strategy(sourceValue, outputValue, `${notation}.${key}`, keyList);
				} else if (object(outputValue) || object(sourceValue)) {
					const cacheNotation = notation;
					notation = (cacheNotation ? `${cacheNotation}.` : '') + key;
					output[key] = assign(outputValue, sourceValue);
					notation = cacheNotation;
				} else {
					output[key] = strategy(sourceValue, outputValue, `${notation}.${key}`, keyList);
				}
			}
		}
		return output;
	};
};
