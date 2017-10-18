const path = require('path');
const spawn = require('cross-spawn');
const httpServer = require('http-server');
const server = httpServer.createServer({
	root: path.resolve(__dirname, '../../'),
});

let argv = process.argv.slice(2);
if (argv.indexOf('--config') === -1) {
	argv = argv.concat(['-c', 'bin/nightwatch/config.js']);
}
if (argv.indexOf('--env') === -1) {
	argv = argv.concat(['-e', 'chrome,phantomjs']);
}
const i = argv.indexOf('--test');
if (i > -1) {
	argv[i + 1] = `test/e2e/specs/${argv[i + 1]}.spec.js`;
}

const runner = spawn('nightwatch', argv, {
	stdio: 'inherit',
});

runner.on('exit', function onExit(code) {
	server.close();
	process.exit(code);
});

runner.on('error', function onError(err) {
	server.close();
	throw err;
});

server.listen(8080);
