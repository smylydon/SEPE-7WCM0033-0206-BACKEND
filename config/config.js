var sequelizeSettings = {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};

module.exports = {
  test: {
    server: {
      serverName: 'test',
      PORT: 8000,
      JWT_SECRET: 'bobulousquest',
    },
    sequelize: {
      db: 'test',
      user: 'postgres',
      password: 'password',
      settings: sequelizeSettings
    }
  },
  dev: {
    server: {
      serverName: 'dev',
      PORT: 8000,
      JWT_SECRET: 'bobulousquest',
    },
    sequelize: {
      db: 'mydb',
      user: 'postgres',
      password: 'password',
      settings: sequelizeSettings
    }
  }
};
