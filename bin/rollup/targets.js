const { is, as } = require('describe-type');

const defaultFormats = ['iife', 'umd', 'amd', 'cjs'];

const target = (outputPath, format, minify) => ({
	file: `${outputPath}.${format}${minify ? '.min' : ''}.js`,
	format,
});

module.exports = (env, output, formats) => {
	formats = as(Array, is.string(formats) ? [formats] : formats, defaultFormats);
	return formats.map(format => target(output, format, env.MINIFY));
};
