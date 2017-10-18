const base = require('./base.config');

module.exports = config => {
	config.set(Object.assign(base, {
		browsers: ['Chrome', 'Firefox', 'Safari'],
		browserDisconnectTimeout: 10000,
		browserDisconnectTolerance: 3,
		concurrency: 2,
		reporters: ['spec'],
		singleRun: true,
	}));
};
