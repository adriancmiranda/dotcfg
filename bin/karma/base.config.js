const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const { aliases, env } = require('../config');

const webpack = {
	plugins: [new DefinePlugin(env)],
	devtool: '#inline-source-map',
	resolve: {
		alias: Object.assign({
			fixtures: resolve('test/fixtures'),
		}, aliases),
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			options: {
				presets: ['env'],
			},
		}],
	},
};

module.exports = {
	webpack,
	basePath: '../../',
	port: 9876,
	colors: true,
	frameworks: ['jasmine', 'jasmine-matchers', 'sinon', 'fixture', 'phantomjs-shim'],
	files: [{
		pattern: 'index.js',
	}, {
		pattern: 'test/fixtures/**/*.fixture.*',
		watched: true,
	}, {
		pattern: 'test/unit/index.js',
		watched: true,
	}],
	preprocessors: {
		'index.js': ['webpack', 'sourcemap'],
		'test/unit/**/{index,*.unit}.js': ['webpack', 'sourcemap'],
		'test/fixtures/**/{index,*.fixture}.js': ['webpack', 'sourcemap'],
		'test/fixtures/**/*.fixture.html': ['html2js'],
		'test/fixtures/**/*.fixture.json': ['json_fixtures'],
	},
	webpackMiddleware: {
		noInfo: true,
	},
	jsonFixturesPreprocessor: {
		variableName: '__json__',
	},
};
