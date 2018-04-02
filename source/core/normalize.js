/* eslint-disable no-restricted-syntax */
import ownProperty from 'describe-type/source/has/ownProperty.js';
import as from 'describe-type/source/as/as.any.js';
import object from 'describe-type/source/is/object.js';
import deletePropertyAt from '../@/deletePropertyAt.js';
import dotStrategyDefault from '../strategies/dotDefault.js';
import write from './write.js';

export default function normalize(hash, strategy, recursive) {
	hash = as(Object, hash, {});
	strategy = as(Function, strategy, dotStrategyDefault);
	recursive = as(Boolean, recursive, true);
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
