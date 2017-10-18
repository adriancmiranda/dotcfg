const base = require('./base.config');

module.exports = config => {
	config.set(Object.assign(base, {
		browsers: ['Chrome', 'Firefox', 'Safari'],
		reporters: ['progress'],
		singleRun: true,
	}));
};
