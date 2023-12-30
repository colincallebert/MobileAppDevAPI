module.exports = {
  port: 9000,
    log: {
      level: 'silly',
      disabled: true,
    },
    cors: {
      origins: ['http://localhost:3000'],
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