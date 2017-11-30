const { env } = require('./@/config');
const rollup = require('./rollup');

module.exports = ([{
	module: 'dotcfg',
	source: 'source/index',
	output: 'dist/dotcfg',
	format: env.FORMATS,
}]).map(file => rollup(file));
