import keys from 'describe-type/source/@/keys.js';
import slice from 'describe-type/source/@/slice.js';
import array from 'describe-type/source/is/array.js';
import object from 'describe-type/source/is/object.js';
import callable from 'describe-type/source/is/callable.js';

export default strategy => {
	let notation = '';
	return function assign(target) {
		const args = slice(arguments);
		const output = Object(target || {});
		for (let ix = 1; ix < args.length; ix++) {
			const from = args[ix];
			const keyList = keys(Object(from));
			for (let iy = 0; iy < keyList.length; iy++) {
				const key = keyList[iy];
				const outputValue = output[key];
				const sourceValue = from[key];
				if (array(outputValue) || array(sourceValue)) {
					const f = array(sourceValue) ? slice(sourceValue) : [];
					const o = array(outputValue) ? slice(outputValue) : [];
					output[key] = strategy(f, o, `${notation}.${key}`, keyList);
				} else if (callable(outputValue) || callable(sourceValue)) {
					output[key] = strategy(sourceValue, outputValue, `${notation}.${key}`, keyList);
				} else if (object(outputValue) || object(sourceValue)) {
					const cn = notation;
					notation = (cn ? `${cn}.` : '') + key;
					output[key] = assign(outputValue, sourceValue);
					notation = cn;
				} else {
					output[key] = strategy(sourceValue, outputValue, `${notation}.${key}`, keyList);
				}
			}
		}
		return output;
	};
};
