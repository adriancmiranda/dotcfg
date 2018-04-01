/* eslint-disable no-restricted-syntax */
import ownProperty from 'describe-type/source/has/ownProperty.js';
import deletePropertyAt from '../@/deletePropertyAt.js';
import write from './write.js';

export default function normalize(object, strategy) {
	for (const key in object) {
		if (ownProperty(object, key)) {
			write(object, key, deletePropertyAt(object, key), strategy);
		}
	}
	return object;
}
