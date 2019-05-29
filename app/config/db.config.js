const tempDB = require('./env.js');
const env = tempDB.db;
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
db.setEmpty=function(res,serviceName,status=true,data={}){
  res.status(200).json({
      estado: status,
      mensaje: serviceName,
      data: data
  });
};
db.cloneObj=function(obj,exclude=true){
  let newObj = Object.assign({},obj);
  if( exclude !== true ) delete newObj[exclude];
  return newObj;
}
db.cloneObjArray=function(obj,params){
  let newObj = {};
  params.forEach((v, k) => { newObj[v] = obj[v]; });
  return newObj;
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// DECLARACION DE MODELOS
db.resources          = require('../model/resources/model.resources')(sequelize, Sequelize);
db.coordinates        = require('../model/resources/model.coordinates')(sequelize, Sequelize);
db.geojson            = require('../model/resources/model.geojson')(sequelize, Sequelize);
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
db.ciiu               = require('../model/permits/model.ciiu')(sequelize, Sequelize);
db.entities           = require('../model/permits/model.entities')(sequelize, Sequelize);
db.locals             = require('../model/permits/model.locals')(sequelize, Sequelize);
db.employees          = require('../model/permits/model.employees')(sequelize, Sequelize);
db.leaderships        = require('../model/tthh/model.leaderships')(sequelize, Sequelize);
db.jobs               = require('../model/tthh/model.jobs')(sequelize, Sequelize);
db.arrears            = require('../model/tthh/model.arrears')(sequelize, Sequelize);
db.plans              = require('../model/prevention/model.plans')(sequelize, Sequelize);
db.brigades           = require('../model/prevention/model.brigades')(sequelize, Sequelize);
db.brigadists         = require('../model/prevention/model.brigadists')(sequelize, Sequelize);
db.selfProtectionAnnexes     = require('../model/prevention/model.selfprotection.annexes')(sequelize, Sequelize);
db.selfProtectionFactors     = require('../model/prevention/model.selfprotection.factors')(sequelize, Sequelize);
db.selfProtectionPrevention  = require('../model/prevention/model.selfprotection.prevention')(sequelize, Sequelize);
db.selfProtectionMaintenance = require('../model/prevention/model.selfprotection.maintenances')(sequelize, Sequelize);
db.selfProtectionMeseri      = require('../model/prevention/model.selfprotection.meseri')(sequelize, Sequelize);

// ASOCIACION DE MODELOS
db.states.belongsTo(db.countries, {foreignKey: 'fk_country_id'});
db.cities.belongsTo(db.states, {foreignKey: 'fk_state_id'});
db.towns.belongsTo(db.states, {foreignKey: 'fk_state_id'});
db.parishes.belongsTo(db.towns, {foreignKey: 'fk_town_id'});

db.jobs.belongsTo(db.leaderships, {foreignKey: 'fk_direccion_id'});

db.users.belongsTo(db.profiles, {as: 'profile', foreignKey: 'fk_perfil_id', targetKey: 'perfil_id'});
db.users.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});

db.entities.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_representante_id', targetKey: 'persona_id'});

db.persons.hasMany(db.academicTraining, {as: 'training', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});
db.academicTraining.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});

// CONTROLLER - PERMISOS
db.locals.belongsTo(db.entities, {as: 'entity', foreignKey: 'fk_entidad_id', targetKey: 'entidad_id'});
db.locals.belongsTo(db.ciiu, {as: 'ciiu', foreignKey: 'fk_ciiu_id', targetKey: 'ciiu_id'});
db.locals.hasOne(db.coordinates, {as: 'coordinates', constraints: false, foreignKey: 'coordenada_entidad_id', targetKey: 'local_id'});

// LOCALES COMERCIALES
db.plans.belongsTo(db.locals, {as: 'local', foreignKey: 'fk_local_id', targetKey: 'local_id'});
db.plans.belongsTo(db.entities, {as: 'billing', foreignKey: 'facturacion_id', targetKey: 'entidad_id'});
db.plans.belongsTo(db.persons, {as: 'sos', foreignKey: 'fk_sos_id', targetKey: 'persona_id'});
db.plans.belongsTo(db.academicTraining, {as: 'training', foreignKey: 'profesional_sos_id', targetKey: 'formacion_id'});
// LISTADO DE EMPLEADOS DE LOCALES
db.employees.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});
// BRIGADAS Y BRIGADISTAS
db.brigades.belongsTo(db.locals, {as: 'local', foreignKey: 'fk_local_id', targetKey: 'local_id'});
db.brigades.belongsTo(db.persons, {as: 'responsable', foreignKey: 'fk_responsable_id', targetKey: 'persona_id'});
db.brigades.belongsTo(db.persons, {as: 'junior', foreignKey: 'fk_subalterno_id', targetKey: 'persona_id'});
db.brigades.hasMany(db.brigadists, {as: 'brigadist', foreignKey: 'fk_brigada_id', targetKey: 'brigada_id'});
db.brigadists.belongsTo(db.employees, {as: 'employee', foreignKey: 'fk_empleado_id', targetKey: 'empleado_id'});
db.brigadists.belongsTo(db.brigades, {as: 'brigade', foreignKey: 'fk_brigada_id', targetKey: 'brigada_id'});
// db.brigades.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});

// AUTOPROTECCION
db.selfProtectionMaintenance.belongsTo(db.entities, {as: 'professional', foreignKey: 'mantenimiento_responsable_id', targetKey: 'entidad_id'});

module.exports = db;
