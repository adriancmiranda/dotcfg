const base = require('./base.config');

module.exports = config => {
	const options = Object.assign(base, {
		singleRun: true,
		browsers: ['PhantomJS'],
		reporters: ['spec', 'coverage'],
		coverageReporter: {
			reporters: [
				{ type: 'lcov', dir: '../coverage', subdir: '.' },
				{ type: 'text-summary', dir: '../coverage', subdir: '.' },
			],
		},
	});
	config.set(options);
};
