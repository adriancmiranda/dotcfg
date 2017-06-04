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
	bail: argv.dev !== true,
	context: __dirname,
	entry: './index.js',
	devtool: 'source-map',
	target: 'web',
	output: {
		path: resolve('./dist'),
		filename: `${pkg.name}${argv.dev !== true ? '.min' : ''}.js`,
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
				enforce: 'post',
				loader: 'es3ify-loader',
				test: /\.js$/,
				exclude: /node_modules/,
			}
		],
	},
	plugins: [].concat(argv.dev !== true && argv.bump ?
		new BumpPlugin([
			'package.json',
			'component.json',
			'bower.json',
		])
	: []).concat(argv.dev !== true && argv.uglify ?
		new optimize.UglifyJsPlugin({
			minimize: true,
			output: {
				comments: false,
			},
		})
	: []).concat(argv.dev !== true && argv.compress ?
		new CompressionWebpackPlugin({
			test: /\.js$/,
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			threshold: 300,
			minRatio: 0.8,
		})
	: []).concat(
		new BannerPlugin({
			banner: pirateFlag(pkg, {
				moment: moment().format('LLLL'),
				commit: git.commithash(),
				homepage: pkg.homepage,
				author: pkg.author,
			}),
		})
	),
});
