import array from 'describe-type/source/is/array.js';
import string from 'describe-type/source/is/string.js';

const dot = /\.(?![^[]*\])/g;
const blank = [];

export default function notation(path) {
	if (string(path)) {
		return path.split(dot);
	}
	return array(path) ? path : blank;
}
