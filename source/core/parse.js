import apply from 'describe-type/source/@/apply.js';
import numeric from 'describe-type/source/is/numeric.js';
import array from 'describe-type/source/is/array.js';
import string from 'describe-type/source/is/string.js';

const hasBrackets = /\[|\]/;
const parts = /(\[{1}\s{0,1})(.{0,}?\]{0,})(\s{0,1}\]{1})/g;
const dot = /\.(?![^[]*\])/g;
const blank = [];

function parse(path) {
	const notation = parse.notation(path);
	for (let x = 0; x < notation.length; x += 1) {
		if (hasBrackets.test(notation[x])) {
			notation[x] = notation[x].replace(parts, ',$2').split(',');
			for (let y = 1; y <= notation[x].length; y += 1) {
				if (numeric(notation[x][y])) {
					notation[x][y] = parseInt(notation[x][y], 10);
				}
			}
		}
	}
	return apply(Array.prototype.concat, [], notation);
}

parse.notation = (path) => {
	if (string(path)) {
		return path.split(dot);
	}
	return array(path) ? path : blank;
};

export default parse;
