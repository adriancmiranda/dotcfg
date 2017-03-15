const { resolve } = require('path');
const { optimize } = require('webpack');
const pkg = require('./package.json');

module.exports = (argv = {}) => ({
	context: __dirname,
	entry: 'index.js',
	devtool: 'source-map',
	output: {
		path: 'dist',
		filename: `${pkg.name}${argv.dev ? '.min' : ''}.js`,
		library: pkg.name,
		libraryTarget: 'umd',
		umdNamedDefine: true
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
		new optimize.UglifyJsPlugin({ minimize: true }),
	],
});
