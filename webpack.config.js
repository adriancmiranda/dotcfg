const { resolve } = require('path');
const { optimize, BannerPlugin } = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const pkg = require('./package.json');

const git = new GitRevisionPlugin({ lightweightTags: true });
const mkBanner = info => {
	return '';
};

module.exports = (argv = {}) => ({
	context: __dirname,
	entry: 'index.js',
	devtool: 'source-map',
	output: {
		path: 'dist',
		filename: `${pkg.name}${argv.dev ? '.min' : ''}.js`,
		library: pkg.name,
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	resolve: {
		modules: [resolve('source')],
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
		],
	},
	plugins: argv.dev ? [] : [
		new optimize.UglifyJsPlugin({
			include: [resolve('source')],
			minimize: true,
		}),
		new BannerPlugin({
			banner: mkBanner({
				homepage: pkg.homepage,
				version: pkg.version,
				commit: git.commithash(),
				name: pkg.name,
			}),
		}),
	],
});
