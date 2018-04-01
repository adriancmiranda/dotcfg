/* eslint-disable no-restricted-syntax */
import ownProperty from 'describe-type/source/has/ownProperty.js';
import object from 'describe-type/source/is/object.js';
import deletePropertyAt from '../@/deletePropertyAt.js';
import write from './write.js';

export default function normalize(hash, strategy, recursive) {
	for (const key in hash) {
		if (ownProperty(hash, key)) {
			if (recursive && object(hash[key])) {
				normalize(hash[key], strategy);
			} else {
				write(hash, key, deletePropertyAt(hash, key), strategy);
			}
		}
	}
	return hash;
}
