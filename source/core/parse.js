import apply from 'describe-type/internal/apply.next.js';
import numeric from 'describe-type/is/numeric.next.js';
import array from 'describe-type/is/array/index.next.js';
import string from 'describe-type/is/string/index.next.js';
import { reHasBrackets, reStartWithBracket, reParts, reDot } from '../@/patterns.js';

function parse(path) {
	const notation = parse.notation(path);
	for (let x = 0; x < notation.length; x += 1) {
		if (reHasBrackets.test(notation[x])) {
			if (reStartWithBracket.test(notation[x])) {
				notation[x] = [notation[x].replace(reParts, '$2')];
			} else {
				notation[x] = notation[x].replace(reParts, ',$2').split(',');
			}
			for (let y = 0; y < notation[x].length; y += 1) {
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
		return path.split(reDot);
	}
	return array(path) ? path : [];
};

export default parse;
