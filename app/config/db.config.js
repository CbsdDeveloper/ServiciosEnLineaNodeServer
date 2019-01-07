const tempDB = require('./env.js');

const env = tempDB.db5;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.profiles = require('../model/model.admin.profiles')(sequelize, Sequelize);
db.stations = require('../model/model.stations')(sequelize, Sequelize);

module.exports = db;