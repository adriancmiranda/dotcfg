const { resolve } = require('path');
const { optimize, BannerPlugin } = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const pirateFlag = require('pirate-flag');
const moment = require('moment');
const pkg = require('./package.json');

const git = new GitRevisionPlugin({ lightweightTags: true });

moment.locale();

module.exports = (argv = {}) => ({
	context: __dirname,
	entry: './index.js',
	devtool: 'source-map',
	target: 'web',
	output: {
		path: './dist',
		filename: `${pkg.name}${argv.dev ? '' : '.min'}.js`,
		library: pkg.name,
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	resolve: {
		alias: {
			'~': resolve('source'),
		},
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				loader: 'xo-loader',
				test: /\.js$/,
				exclude: /node_modules/,
				options: {
					emitError: true,
				},
			},
			{
				loader: 'es3ify-loader',
				test: /\.js$/,
				exclude: /node_modules/,
			}
		],
	},
	plugins: argv.dev ? [] : [
		new optimize.UglifyJsPlugin({
			minimize: true,
			output: {
				comments: false,
			},
		}),
		new BannerPlugin({
			banner: pirateFlag(pkg, {
				moment: moment().format('LLLL'),
				commit: git.commithash(),
				homepage: pkg.homepage,
				author: pkg.author,
			}),
		}),
	],
});
