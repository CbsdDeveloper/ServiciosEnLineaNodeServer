const tempDB = require('./env.js');
const env = tempDB.db3;
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

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

// PARSE MODEL
db.setJSON=function(res,data,serviceName){
  res.status(200).json({
      estado: (data.length>0)?true:false,
      mensaje: serviceName,
      length: data.length,
      data: data
  });
};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

// DECLARACION DE MODELOS
db.countries          = require('../model/resources/model.countries')(sequelize, Sequelize);
db.states             = require('../model/resources/model.states')(sequelize, Sequelize);
db.cities             = require('../model/resources/model.cities')(sequelize, Sequelize);
db.towns              = require('../model/resources/model.towns')(sequelize, Sequelize);
db.parishes           = require('../model/resources/model.parishes')(sequelize, Sequelize);
db.persons            = require('../model/resources/model.persons')(sequelize, Sequelize);
db.profiles           = require('../model/admin/model.profiles')(sequelize, Sequelize);
db.users              = require('../model/admin/model.users')(sequelize, Sequelize);
db.stations           = require('../model/tthh/model.stations')(sequelize, Sequelize);
db.academicTraining   = require('../model/tthh/model.academicTraining')(sequelize, Sequelize);
db.activities         = require('../model/permits/model.activities')(sequelize, Sequelize);
db.entities           = require('../model/permits/model.entities')(sequelize, Sequelize);
db.leaderships        = require('../model/tthh/model.leaderships')(sequelize, Sequelize);
db.jobs               = require('../model/tthh/model.jobs')(sequelize, Sequelize);

// ASOCIACION DE MODELOS
db.states.belongsTo(db.countries, {foreignKey: 'fk_country_id'});
db.cities.belongsTo(db.states, {foreignKey: 'fk_state_id'});
db.towns.belongsTo(db.states, {foreignKey: 'fk_state_id'});
db.parishes.belongsTo(db.towns, {foreignKey: 'fk_town_id'});

db.jobs.belongsTo(db.leaderships, {foreignKey: 'fk_direccion_id'});

db.users.belongsTo(db.profiles, {as: 'profile', foreignKey: 'fk_perfil_id', targetKey: 'perfil_id'});
db.users.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});

db.entities.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_representante_id', targetKey: 'persona_id'});

db.academicTraining.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});

module.exports = db;
