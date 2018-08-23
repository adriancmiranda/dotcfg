import array from 'describe-type/is/array/index.next.js';

export default function assignDefault(value, target) {
	if (array(target)) {
		return target.concat(value);
	}
	return value;
}
