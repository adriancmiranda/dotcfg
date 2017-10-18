const Git = require('git-revision-webpack-plugin');
const { resolve } = require('path');
const { aliases } = require('./@utilities/aliases');
const { params } = require('./@utilities/env');
const { args } = require('./@utilities/argv');
const banner = require('./@utilities/banner');

exports.git = new Git({ lightweightTags: true, branch: true });

exports.env = params(process.env);

exports.argv = args(process.argv);

exports.pack = require('../package.json');

exports.flag = banner(exports.pack, exports.git);

exports.aliases = aliases(resolve('source'));

exports.vars = {
	__ENV__: exports.env.NODE_ENV || 'development',
	__COMMIT__: exports.git.commithash(),
	__VERSION__: exports.pack.version,
};
