export const notation = {
  'server.host': '0.0.0.0',
  'server.port': 3000,
  'server.db.uri': 'mongodb://${server.host}:${server.port}',
};

export const mixed = {
	server: {
		host: '0.0.0.0',
		port: 3000,
		'[db.uri]': 'mongodb://${server.host}:${server.port}',
	},
};