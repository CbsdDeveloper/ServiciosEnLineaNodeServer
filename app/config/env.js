'use strict';
const env = {
  db5: {
    database: 'db_cbsd',
    username: 'dba_cbsd',
    password: 'Cbsd2019',
    host: '192.168.140.5',
    dialect: 'postgres',
    port: 5433,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  db3: {
    database: 'db_cbsd',
    username: 'dba_cbsd',
    password: 'Cbsd2019',
    host: '192.168.140.3',
    dialect: 'postgres',
    port: 5433,
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