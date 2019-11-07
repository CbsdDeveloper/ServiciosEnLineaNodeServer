'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
// const env = 'production';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;

if (config.use_env_variable) sequelize = new Sequelize(process.env[config.use_env_variable], config);
else sequelize = new Sequelize(config.database, config.username, config.password, config.config);


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
};
db.cloneObjArray=function(obj,params){
	let newObj = {};
	params.forEach((v, k) => { newObj[v] = obj[v]; });
	return newObj;
};


// DECLARACION DE MODELOS
// RESOURCES
db.resources          = require('../models/resources/model.resources')(sequelize, Sequelize);
db.coordinates        = require('../models/resources/model.coordinates')(sequelize, Sequelize);
db.geojson            = require('../models/resources/model.geojson')(sequelize, Sequelize);
db.countries          = require('../models/resources/model.countries')(sequelize, Sequelize);
db.states             = require('../models/resources/model.states')(sequelize, Sequelize);
db.cities             = require('../models/resources/model.cities')(sequelize, Sequelize);
db.towns              = require('../models/resources/model.towns')(sequelize, Sequelize);
db.parishes           = require('../models/resources/model.parishes')(sequelize, Sequelize);
db.persons            = require('../models/resources/model.persons')(sequelize, Sequelize);
// ADMINISTRACION
db.profiles           = require('../models/admin/model.profiles')(sequelize, Sequelize);
db.users              = require('../models/admin/model.users')(sequelize, Sequelize);
db.stations           = require('../models/tthh/model.stations')(sequelize, Sequelize);
db.academicTraining   = require('../models/tthh/model.academicTraining')(sequelize, Sequelize);
// PERMISOS
db.activities         = require('../models/permits/model.activities')(sequelize, Sequelize);
db.taxes			  = require('../models/permits/model.taxes')(sequelize, Sequelize);
db.ciiu               = require('../models/permits/model.ciiu')(sequelize, Sequelize);
db.entities           = require('../models/permits/model.entities')(sequelize, Sequelize);
db.locals             = require('../models/permits/model.locals')(sequelize, Sequelize);
db.employees          = require('../models/permits/model.employees')(sequelize, Sequelize);
// TALENTO HUMANO
db.workdays           = require('../models/tthh/model.workdays')(sequelize, Sequelize);
db.leaderships        = require('../models/tthh/model.leaderships')(sequelize, Sequelize);
db.jobs               = require('../models/tthh/model.jobs')(sequelize, Sequelize);
db.arrears            = require('../models/tthh/model.arrears')(sequelize, Sequelize);
db.medicines          = require('../models/tthh/model.medicines')(sequelize, Sequelize);
db.inventoryMedicines = require('../models/tthh/model.inventory')(sequelize, Sequelize);
db.psychosocialforms  = require('../models/tthh/model.psychosocial.forms')(sequelize, Sequelize);
db.psychosocialformsSections	= require('../models/tthh/model.psychosocial.sections')(sequelize, Sequelize);
// PREVENCION
db.plans              			= require('../models/prevention/model.plans')(sequelize, Sequelize);
db.brigades           			= require('../models/prevention/model.brigades')(sequelize, Sequelize);
db.brigadists         			= require('../models/prevention/model.brigadists')(sequelize, Sequelize);
db.selfProtectionAnnexes     	= require('../models/prevention/model.selfprotection.annexes')(sequelize, Sequelize);
db.selfProtectionFactors     	= require('../models/prevention/model.selfprotection.factors')(sequelize, Sequelize);
db.selfProtectionPrevention  	= require('../models/prevention/model.selfprotection.prevention')(sequelize, Sequelize);
db.selfProtectionMaintenance	= require('../models/prevention/model.selfprotection.maintenances')(sequelize, Sequelize);
db.selfProtectionMeseri      	= require('../models/prevention/model.selfprotection.meseri')(sequelize, Sequelize);
// PLANIFICACION
db.programspoa		= require('../models/planing/model.programs')(sequelize, Sequelize);
db.poa				= require('../models/planing/model.poa')(sequelize, Sequelize);
db.poaprojects		= require('../models/planing/model.poaprojects')(sequelize, Sequelize);
// FINANCIERO
db.contractingprocedures	= require('../models/financial/model.contractingprocedures')(sequelize, Sequelize);


// ASOCIACION DE MODELOS
db.states.belongsTo(db.countries, {foreignKey: 'fk_country_id'});
db.cities.belongsTo(db.states, {foreignKey: 'fk_state_id'});
db.towns.belongsTo(db.states, {foreignKey: 'fk_state_id'});
db.parishes.belongsTo(db.towns, {foreignKey: 'fk_town_id'});

db.jobs.belongsTo(db.leaderships, {as: 'leadership', foreignKey: 'fk_direccion_id', targetKey: 'direccion_id'});

db.users.belongsTo(db.profiles, {as: 'profile', foreignKey: 'fk_perfil_id', targetKey: 'perfil_id'});
db.users.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});

db.entities.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_representante_id', targetKey: 'persona_id'});

db.persons.hasMany(db.academicTraining, {as: 'training', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});
db.academicTraining.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});
// TTHH - DEPARTAMENTO MEDICO
db.inventoryMedicines.belongsTo(db.medicines, {as: 'medicine', foreignKey: 'fk_medicamento_id', targetKey: 'medicamento_id'});

// CONTROLLER - PERMISOS
db.taxes.belongsTo(db.activities, {as: 'activities', foreignKey: 'fk_actividad_id', targetKey: 'actividad_id'});
db.ciiu.belongsTo(db.taxes, {as: 'taxes', foreignKey: 'fk_tasa_id', targetKey: 'tasa_id'});
db.locals.belongsTo(db.entities, {as: 'entity', foreignKey: 'fk_entidad_id', targetKey: 'entidad_id'});
db.locals.belongsTo(db.ciiu, {as: 'ciiu', foreignKey: 'fk_ciiu_id', targetKey: 'ciiu_id'});
db.locals.hasOne(db.coordinates, {as: 'coordinates', constraints: false, foreignKey: 'coordenada_entidad_id', targetKey: 'local_id'});

// LOCALES COMERCIALES
db.plans.belongsTo(db.locals, {as: 'local', foreignKey: 'fk_local_id', targetKey: 'local_id'});
db.plans.belongsTo(db.entities, {as: 'billing', foreignKey: 'facturacion_id', targetKey: 'entidad_id'});
db.plans.belongsTo(db.persons, {as: 'responsable', foreignKey: 'fk_responsable_tramite', targetKey: 'persona_id'});
db.plans.belongsTo(db.persons, {as: 'sos', foreignKey: 'fk_sos_id', targetKey: 'persona_id'});
db.plans.belongsTo(db.academicTraining, {as: 'training', foreignKey: 'profesional_sos_id', targetKey: 'formacion_id'});
// LISTADO DE EMPLEADOS DE LOCALES
db.employees.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});
db.employees.belongsTo(db.locals, {as: 'local', foreignKey: 'fk_local_id', targetKey: 'local_id'});
db.employees.hasMany(db.brigadists, {as: 'brigade', foreignKey: 'fk_empleado_id', targetKey: 'empleado_id', onDelete: 'CASCADE', hooks:true});

// BRIGADAS Y BRIGADISTAS
db.brigades.belongsTo(db.locals, {as: 'local', foreignKey: 'fk_local_id', targetKey: 'local_id'});
db.brigades.belongsTo(db.persons, {as: 'responsable', foreignKey: 'fk_responsable_id', targetKey: 'persona_id'});
db.brigades.belongsTo(db.persons, {as: 'junior', foreignKey: 'fk_subalterno_id', targetKey: 'persona_id'});
db.brigades.hasMany(db.brigadists, {as: 'brigadist', foreignKey: 'fk_brigada_id', targetKey: 'brigada_id'});
db.brigadists.belongsTo(db.employees, {as: 'employee', foreignKey: 'fk_empleado_id', targetKey: 'empleado_id'});
db.brigadists.belongsTo(db.brigades, {as: 'brigade', foreignKey: 'fk_brigada_id', targetKey: 'brigada_id'});

// AUTOPROTECCION
db.selfProtectionMaintenance.belongsTo(db.entities, {as: 'professional', foreignKey: 'mantenimiento_responsable_id', targetKey: 'entidad_id'});

db.resources.hasMany(db.selfProtectionMaintenance, {as: 'maintenance', foreignKey: 'fk_recurso_id', targetKey: 'recurso_id'});
db.selfProtectionMaintenance.belongsTo(db.resources, {as: 'resource', foreignKey: 'fk_recurso_id', targetKey: 'recurso_id'});

// PLANIFICACION
db.poaprojects.belongsTo(db.programspoa, {as: 'program', foreignKey: 'fk_programa_id', targetKey: 'programa_id'});
db.poaprojects.belongsTo(db.poa, {as: 'poa', foreignKey: 'fk_poa_id', targetKey: 'poa_id'});

// EVALUACION DE RIESGO PSICOSOCIAL
db.psychosocialformsSections.belongsTo(db.psychosocialforms, {as: 'form', foreignKey: 'fk_formulario_id', targetKey: 'formulario_id'});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.sequelize.sync({force: false}).then(() => {});

module.exports = db;