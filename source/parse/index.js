import numeric from 'describe-type/source/is/numeric.js';
import parseNotation from './notation';

const hasBrackets = /\[|\]/;
const parts = /(\[{1}\s{0,1})(.{0,}?\]{0,})(\s{0,1}\]{1})/g;

function strategies(path) {
	const notation = parseNotation(path);
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
	return Array.prototype.concat.apply([], notation);
}

strategies.notation = parseNotation;
export default strategies;
