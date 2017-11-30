import array from 'describe-type/source/is/array.js';

export default function assignDefault(value, target) {
	if (array(target)) {
		return target.concat(value);
	}
	return value;
}
