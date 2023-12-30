module.exports = {
  port: 9000,
  log: {
    level: 'info',
    disabled: false,
  },
  cors: {
    origins: ['https://two223-frontend-boerderij.onrender.com'],
    maxAge: 3 * 60 * 60,
  },
  database: {
		client: 'mysql2',
		host: 'vichogent.be',
		port: 40043,
		name: '074870cc',
		username: '074870cc',
		password: 'X5HAoR9X0scNQlargifv',
	},
};