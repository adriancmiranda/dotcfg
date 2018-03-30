const crossSpawn = require('cross-spawn');

function proxy(spawnResult, bail) {
	if (spawnResult.signal) {
		const tooEarlyMessage = 'The build failed because the process exited too early.';
		if (spawnResult.signal === 'SIGKILL') console.error([
			tooEarlyMessage,
			'This probably means the system ran out of memory or someone called',
			'"kill -9" on the process.',
		].join(' '));
		else if (spawnResult.signal === 'SIGTERM') console.error([
			tooEarlyMessage,
			'Someone might have called `kill` or `killall`, or the system could',
			'be shutting down.',
		].join(' '));
		return process.exit(1);
	}
	return spawnResult;
}

function spawn(cmd, args, options) {
	return proxy(crossSpawn(cmd, args, Object.assign({ stdio: 'inherit' }, options)));
}

spawn.sync = function spawnSync(cmd, args, options) {
	return proxy(crossSpawn.sync(cmd, args, Object.assign({ stdio: 'inherit' }, options)));
};

module.exports = spawn;
