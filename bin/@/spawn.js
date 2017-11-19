const crossSpawn = require('cross-spawn');

function exit(result) {
	const tooEarlyMessage = 'The build failed because the process exited too early.';
	switch (result.signal) {
		case 'SIGKILL': console.error([
			tooEarlyMessage,
			'This probably means the system ran out of memory or someone called',
			'"kill -9" on the process.',
		].join(' ')); return process.exit(1);
		case 'SIGTERM': console.error([
			tooEarlyMessage,
			'Someone might have called `kill` or `killall`, or the system could',
			'be shutting down.',
		].join(' ')); return process.exit(1);
		default: return process.exit(result.status);
	}
}

module.exports = function spawn(cmd, args, options) {
	return exit(crossSpawn(cmd, args, Object.assign({ stdio: 'inherit' }, options)));
}

spawn.sync = function spawnSync(cmd, args, options) {
  return exit(crossSpawn.sync(cmd, args, Object.assign({ stdio: 'inherit' }, options)));
}
