const { resolve } = require('path');
const { optimize, BannerPlugin } = require('webpack');
const BumpPlugin = require('bump-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const pirateFlag = require('pirate-flag');
const moment = require('moment');
const pkg = require('./package.json');

const git = new GitRevisionPlugin({ lightweightTags: true });

moment.locale();

module.exports = (argv = {}) => ({
	bail: !argv.dev,
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
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				loader: 'xo-loader',
				test: /\.js$/,
				include: [
					resolve('index.js'),
					resolve('source'),
				],
				options: {
					emitError: true,
					fix: true,
					rules: {
						'import/no-unresolved': 0,
					}
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
		new CompressionWebpackPlugin({
			test: /\.js$/,
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			threshold: 300,
			minRatio: 0.8,
		}),
		new BannerPlugin({
			banner: pirateFlag(pkg, {
				moment: moment().format('LLLL'),
				commit: git.commithash(),
				homepage: pkg.homepage,
				author: pkg.author,
			}),
		}),
		new BumpPlugin([
			'package.json',
			'component.json',
			'bower.json',
		]),
	],
});
