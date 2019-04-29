'use strict';
const env = {
  db: {
    database: 'db_cbsd',
    username: 'postgres',
    password: 'Cbsd2019',
    host: '192.168.1.3',
    dialect: 'postgres',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  dbs: {
    database: 'db_cbsd',
    username: 'postgres',
    password: 'root',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

module.exports = env;