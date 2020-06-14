'use strict';

const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DD';
const DATETIME_FORMAT = 'YYYY-MM-DD hh:mm';
const TIMESTAMP_FORMAT = 'YYYY-MM-DD hh:mm:ss';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
// const env = 'production';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) sequelize = new Sequelize(process.env[config.use_env_variable], config);
else sequelize = new Sequelize(config.database, config.username, config.password, config.config);

//require('pg').types.setTypeParser(1114, str => str);
require('pg').types.setTypeParser(1114, str => moment(str).format('YYYY-MM-DD HH:mm:ss'));

db.getCurrentDate=function(){
	return new Date();
};
db.setDataTable=function(res,data,serviceName = 'dataTable',status = true){
	res.status(200).json({
		estado: status,
		mensaje: serviceName,
		data: data
	});
};
db.setJSON=function(res,data,serviceName){
	// res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
	res.status(200).json({
		estado: (data.length>0)?true:false,
		mensaje: serviceName,
		length: data.length,
		data: data
	});
};
db.setEmpty=function(res,serviceName,status=true,data={}){
	// res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
	res.status(200).json({
		estado: status,
		mensaje: serviceName,
		data: data
	});
};
db.parseJSON=function(msg,status=false,data={}){
	return {
		estado: status,
		mensaje: msg,
		data: data
	};
};
db.sendJSON=function(res, json){
	res.status(200).json( json );
};
db.endConection=function(res,next,serviceName='ServiceName',status=false,code=200){
	res.status(code).json({
		estado: status,
		mensaje: serviceName
	});
	return next();
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
db.rsc = {};
db.resources			= require('../models/resources/model.resources')(sequelize, Sequelize);
db.coordinates			= require('../models/resources/model.coordinates')(sequelize, Sequelize);
db.geojson				= require('../models/resources/model.geojson')(sequelize, Sequelize);
db.countries			= require('../models/resources/model.countries')(sequelize, Sequelize);
db.states				= require('../models/resources/model.states')(sequelize, Sequelize);
db.cities				= require('../models/resources/model.cities')(sequelize, Sequelize);
db.towns				= require('../models/resources/model.towns')(sequelize, Sequelize);
db.parishes				= require('../models/resources/model.parishes')(sequelize, Sequelize);
db.persons				= require('../models/resources/model.persons')(sequelize, Sequelize);
db.driverlicenses		= require('./resources/model.driverlicenses')(sequelize, Sequelize);
db.rsc.forms			= require('./resources/model.forms')(sequelize, Sequelize);
db.rsc.formSections		= require('./resources/model.forms.sections')(sequelize, Sequelize);
db.rsc.formQuestions	= require('./resources/model.forms.questions')(sequelize, Sequelize);
// ADMINISTRACION
db.labels				= require('../models/admin/model.labels')(sequelize, Sequelize);
db.parameters			= require('../models/admin/model.parameters')(sequelize, Sequelize);
db.webmail				= require('../models/admin/model.webmail')(sequelize, Sequelize);
db.reports				= require('../models/admin/model.reports')(sequelize, Sequelize);
db.profiles				= require('../models/admin/model.profiles')(sequelize, Sequelize);
db.users				= require('../models/admin/model.users')(sequelize, Sequelize);
db.stations				= require('./tthh/institution/model.stations')(sequelize, Sequelize);
db.academicTraining		= require('../models/tthh/model.academicTraining')(sequelize, Sequelize);
// DIRECCION DE TALENTO HUMANO
db.workdays           = require('../models/tthh/model.workdays')(sequelize, Sequelize);
db.scheduleworkdays   = require('../models/tthh/model.scheduleworkdays')(sequelize, Sequelize);
db.leaderships        = require('./tthh/institution/model.leaderships')(sequelize, Sequelize);
db.jobs               = require('./tthh/institution/model.jobs')(sequelize, Sequelize);
db.staff			  = require('../models/tthh/model.staff')(sequelize, Sequelize);
db.ppersonal		  = require('../models/tthh/model.ppersonal')(sequelize, Sequelize);
db.operators		  = require('../models/tthh/model.operators')(sequelize, Sequelize);
db.biometricPeriods	  = require('./tthh/attendance/model.biometricPeriods')(sequelize, Sequelize);
db.biometricMarkings  = require('./tthh/attendance/model.biometricMarkings')(sequelize, Sequelize);
db.typeAdvances       = require('../models/tthh/model.typeadvances')(sequelize, Sequelize);
db.typeContracts      = require('../models/tthh/model.typecontracts')(sequelize, Sequelize);
db.wineries			  = require('./tthh/institution/model.wineries')(sequelize, Sequelize);
	// CONTROL DE ASISTENCIA
db.absences			  = require('./tthh/attendance/model.absences')(sequelize, Sequelize);
db.absencesControl	  = require('./tthh/attendance/model.absences.control')(sequelize, Sequelize);
	// DEP. MEDICO
db.medicines          				= require('./tthh/md/model.medicines')(sequelize, Sequelize);
db.inventoryMedicines 				= require('./tthh/md/model.inventory')(sequelize, Sequelize);
db.medicalrestRecipients 			= require('./tthh/md/model.medicalrest.recipients')(sequelize, Sequelize);
	// EVAUACIONES
db.surveysEvaluations				= require('./tthh/surveys/model.evaluations')(sequelize, Sequelize);
db.surveysStaffEvaluations			= require('./tthh/surveys/model.staff.evaluation')(sequelize, Sequelize);
db.surveysStaffEvaluationsAnswers	= require('./tthh/surveys/model.staff.evaluation.answers')(sequelize, Sequelize);
	// SOS
db.psychosocialforms				= require('./tthh/sos/model.psychosocial.forms')(sequelize, Sequelize);
db.psychosocialformsSections		= require('./tthh/sos/model.psychosocial.sections')(sequelize, Sequelize);
db.psychosocialformsQuestions		= require('./tthh/sos/model.psychosocial.forms.questions')(sequelize, Sequelize);
db.psychosocialEvaluations			= require('./tthh/sos/model.psychosocial.evaluation')(sequelize, Sequelize);
db.psychosocialEvaluationsQuestions	= require('./tthh/sos/model.psychosocial.evaluation.questions')(sequelize, Sequelize);
db.psychosocialTest					= require('./tthh/sos/model.psychosocial.test')(sequelize, Sequelize);
db.psychosocialTestAnswers			= require('./tthh/sos/model.psychosocial.test.answers')(sequelize, Sequelize);
// DIRECCION ADMINISTRATIVA
	// ARCHIVO
db.archiveshelving				= require('./administrative/archive/model.shelving')(sequelize, Sequelize);
db.archiveboxes					= require('./administrative/archive/model.boxes')(sequelize, Sequelize);
db.archivecategories			= require('./administrative/archive/model.categories')(sequelize, Sequelize);
db.archiveclassification		= require('./administrative/archive/model.classification')(sequelize, Sequelize);
db.archivefolder				= require('./administrative/archive/model.folder')(sequelize, Sequelize);
db.archivedocuments				= require('./administrative/archive/model.documents')(sequelize, Sequelize);
// PREVENCION
db.plans              			= require('../models/prevention/model.plans')(sequelize, Sequelize);
db.brigades           			= require('../models/prevention/model.brigades')(sequelize, Sequelize);
db.brigadists         			= require('../models/prevention/model.brigadists')(sequelize, Sequelize);
db.selfProtectionAnnexes     	= require('../models/prevention/model.selfprotection.annexes')(sequelize, Sequelize);
db.selfProtectionFactors     	= require('../models/prevention/model.selfprotection.factors')(sequelize, Sequelize);
db.selfProtectionPrevention  	= require('../models/prevention/model.selfprotection.prevention')(sequelize, Sequelize);
db.selfProtectionMaintenance	= require('../models/prevention/model.selfprotection.maintenances')(sequelize, Sequelize);
db.selfProtectionMeseri      	= require('../models/prevention/model.selfprotection.meseri')(sequelize, Sequelize);
db.covid						= require('../models/prevention/biosecurity/model.covid')(sequelize, Sequelize);
db.covidResources				= require('../models/prevention/biosecurity/model.covid.resources')(sequelize, Sequelize);
// PLANIFICACION
db.programspoa				= require('../models/planing/model.programs')(sequelize, Sequelize);
db.poa						= require('../models/planing/model.poa')(sequelize, Sequelize);
db.poaprojects				= require('../models/planing/model.poaprojects')(sequelize, Sequelize);
// FINANCIERO
db.budgetclassifier			= require('./financial/model.budgetClassifier')(sequelize, Sequelize);
db.accountcatalog			= require('./financial/model.accountCatalog')(sequelize, Sequelize);
db.retentionclassifier		= require('./financial/model.retentionClassifier')(sequelize, Sequelize);
db.financialPrograms		= require('./financial/model.programs')(sequelize, Sequelize);
db.financialSubprograms		= require('./financial/model.subprograms')(sequelize, Sequelize);
db.financialProjects		= require('./financial/model.projects')(sequelize, Sequelize);
db.financialActivities		= require('./financial/model.activities')(sequelize, Sequelize);
db.financialentities		= require('./financial/model.entities')(sequelize, Sequelize);
db.financialtypedocuments	= require('./financial/model.typedocuments')(sequelize, Sequelize);
db.contractingprocedures	= require('./financial/model.contractingprocedures')(sequelize, Sequelize);
	// PERMISOS
db.activities			= require('../models/permits/model.activities')(sequelize, Sequelize);
db.taxes				= require('../models/permits/model.taxes')(sequelize, Sequelize);
db.ciiu					= require('../models/permits/model.ciiu')(sequelize, Sequelize);
db.entities				= require('../models/permits/model.entities')(sequelize, Sequelize);
db.locals				= require('../models/permits/model.locals')(sequelize, Sequelize);
db.employees			= require('../models/permits/model.employees')(sequelize, Sequelize);
db.selfInspections		= require('../models/permits/model.selfinspections')(sequelize, Sequelize);
db.permitsLocals		= require('../models/permits/model.permits')(sequelize, Sequelize);
db.duplicates			= require('../models/permits/model.duplicates')(sequelize, Sequelize);
// SUBJEFATURA
	// UNIDAD ATENCIÓN PREHOSPITALARIA
db.aphSupplies					= require('./subjefature/aph/model.aph.supplies')(sequelize, Sequelize);
db.aphSupplycontrol				= require('./subjefature/aph/model.aph.supplycontrol')(sequelize, Sequelize);
db.aphSupplyMovements			= require('./subjefature/aph/model.aph.supplycontrolmovements')(sequelize, Sequelize);
	// PARTES
db.parts					= require('../models/subjefature/model.parts')(sequelize, Sequelize);
db.attended					= require('../models/subjefature/model.attended')(sequelize, Sequelize);
db.partSupplies				= require('../models/subjefature/model.aphsupplies')(sequelize, Sequelize);


// ASOCIACION DE MODELOS
db.states.belongsTo(db.countries, {foreignKey: 'fk_country_id'});
db.cities.belongsTo(db.states, {foreignKey: 'fk_state_id'});
db.towns.belongsTo(db.states, {foreignKey: 'fk_state_id'});
db.parishes.belongsTo(db.towns, {foreignKey: 'fk_town_id'});

db.users.belongsTo(db.profiles, {as: 'profile', foreignKey: 'fk_perfil_id', targetKey: 'perfil_id'});
db.users.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});

db.entities.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_representante_id', targetKey: 'persona_id'});
db.entities.belongsTo(db.users, {as: 'user', foreignKey: 'fk_usuario_id', targetKey: 'usuario_id'});

db.persons.hasMany(db.academicTraining, {as: 'training', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});
db.academicTraining.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});

db.resources.belongsTo(db.users, {as: 'user', foreignKey: 'fk_usuario_id', targetKey: 'usuario_id'});

db.rsc.forms.belongsTo(db.staff, {as: 'user', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});

db.rsc.formSections.belongsTo(db.staff, {as: 'user', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.rsc.formSections.belongsTo(db.rsc.forms, {as: 'form', foreignKey: 'fk_formulario_id', targetKey: 'formulario_id'});
db.rsc.formSections.hasMany(db.rsc.formQuestions, {as: 'questions', foreignKey: 'fk_seccion_id', targetKey: 'seccion_id'});

db.rsc.formQuestions.belongsTo(db.staff, {as: 'user', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.rsc.formQuestions.belongsTo(db.rsc.formSections, {as: 'section', foreignKey: 'fk_seccion_id', targetKey: 'seccion_id'});
db.rsc.formQuestions.belongsTo(db.resources, {as: 'rating', foreignKey: 'fk_sistemacalificacion_id', targetKey: 'recurso_id'});

// SUBJEFATURA - GENERAL
db.wineries.belongsTo(db.stations, {as: 'station', foreignKey: 'fk_estacion_id', targetKey: 'estacion_id'});
// DIRECCION DE TALENTO HUMANO
	// INSTITUCION
db.stations.belongsTo(db.users, {as: 'user', foreignKey: 'fk_usuario_id', targetKey: 'usuario_id'});
db.leaderships.belongsTo(db.users, {as: 'user', foreignKey: 'fk_usuario_id', targetKey: 'usuario_id'});
db.leaderships.belongsTo(db.leaderships, {as: 'leadership', foreignKey: 'fk_direccion_id', targetKey: 'direccion_id'});
db.jobs.belongsTo(db.leaderships, {as: 'leadership', foreignKey: 'fk_direccion_id', targetKey: 'direccion_id'});
db.jobs.belongsTo(db.users, {as: 'user', foreignKey: 'fk_usuario_id', targetKey: 'usuario_id'});
	// PARAMETRICACION
db.workdays.hasMany(db.scheduleworkdays, {as: 'schedules', foreignKey: 'fk_jornada_id', targetKey: 'jornada_id'});
db.scheduleworkdays.belongsTo(db.workdays, {as: 'workday', foreignKey: 'fk_jornada_id', targetKey: 'jornada_id'});
db.typeContracts.belongsTo(db.typeAdvances, {as: 'advance', foreignKey: 'fk_tipoanticipo_id', targetKey: 'tanticipo_id'});
	// PERSONAL
db.staff.belongsTo(db.persons, {as: 'person', foreignKey: 'fk_persona_id', targetKey: 'persona_id'});
db.staff.belongsTo(db.stations, {as: 'station', foreignKey: 'fk_estacion_id', targetKey: 'estacion_id'});
db.staff.belongsTo(db.workdays, {as: 'workday', foreignKey: 'fk_jornada_id', targetKey: 'jornada_id'});
db.ppersonal.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.ppersonal.belongsTo(db.jobs, {as: 'job', foreignKey: 'fk_puesto_id', targetKey: 'puesto_id'});
db.operators.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.operators.belongsTo(db.driverlicenses, {as: 'license', foreignKey: 'fk_licencia_id', targetKey: 'licencia_id'});
	// DEPARTAMENTO MEDICO
db.medicalrestRecipients.belongsTo(db.staff, {as: 'responsible', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.medicalrestRecipients.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_destinatario_id', targetKey: 'personal_id'});
db.inventoryMedicines.belongsTo(db.medicines, {as: 'medicine', foreignKey: 'fk_medicamento_id', targetKey: 'medicamento_id'});
	// CONTROL DE ASISTENCIA
db.biometricPeriods.hasMany(db.biometricMarkings, {as: 'markings', foreignKey: 'fk_periodo_id', targetKey: 'periodo_id'});
db.biometricMarkings.belongsTo(db.biometricPeriods, {as: 'period', foreignKey: 'fk_periodo_id', targetKey: 'periodo_id'});
db.biometricMarkings.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_biometrico_id', targetKey: 'biometrico_id'});
db.biometricMarkings.belongsTo(db.stations, {as: 'station', foreignKey: 'fk_estacion_id', targetKey: 'estacion_id'});
db.biometricMarkings.belongsTo(db.workdays, {as: 'workday', foreignKey: 'fk_jornada_id', targetKey: 'jornada_id'});
db.absences.belongsTo(db.staff, {as: 'responsible', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.absences.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_faltante_id', targetKey: 'personal_id'});
db.absences.belongsTo(db.staff, {as: 'register', foreignKey: 'fk_registra_id', targetKey: 'personal_id'});
db.absences.belongsTo(db.staff, {as: 'justifie', foreignKey: 'fk_justifica_id', targetKey: 'personal_id'});
db.absences.hasMany(db.absencesControl, {as: 'control', foreignKey: 'fk_inasistencia_id', targetKey: 'inasistencia_id'});
db.absencesControl.belongsTo(db.absences, {as: 'absence', foreignKey: 'fk_inasistencia_id', targetKey: 'inasistencia_id'});
db.absencesControl.belongsTo(db.staff, {as: 'responsible', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});

// CONTROLLER - PERMISOS
db.taxes.belongsTo(db.activities, {as: 'activity', foreignKey: 'fk_actividad_id', targetKey: 'actividad_id'});
db.ciiu.belongsTo(db.taxes, {as: 'taxe', foreignKey: 'fk_tasa_id', targetKey: 'tasa_id'});
db.locals.belongsTo(db.entities, {as: 'entity', foreignKey: 'fk_entidad_id', targetKey: 'entidad_id'});
db.locals.belongsTo(db.users, {as: 'user', foreignKey: 'fk_usuario_id', targetKey: 'usuario_id'});
db.locals.belongsTo(db.ciiu, {as: 'ciiu', foreignKey: 'fk_ciiu_id', targetKey: 'ciiu_id'});
db.locals.hasOne(db.coordinates, {as: 'coordinates', constraints: false, foreignKey: 'coordenada_entidad_id', targetKey: 'local_id'});
db.selfInspections.belongsTo(db.locals, {as: 'local', foreignKey: 'fk_local_id', targetKey: 'local_id'});
db.permitsLocals.belongsTo(db.selfInspections, {as: 'selfInspection', foreignKey: 'fk_autoinspeccion_id', targetKey: 'autoinspeccion_id'});
db.permitsLocals.belongsTo(db.users, {as: 'user', foreignKey: 'fk_usuario_id', targetKey: 'usuario_id'});

db.duplicates.belongsTo(db.permitsLocals, {as: 'permit', foreignKey: 'fk_permiso_id', targetKey: 'permiso_id'});
db.duplicates.belongsTo(db.users, {as: 'requesting', foreignKey: 'fk_usuario_solicita', targetKey: 'usuario_id'});
db.duplicates.belongsTo(db.users, {as: 'approving', foreignKey: 'fk_usuario_aprueba', targetKey: 'usuario_id'});
db.duplicates.belongsTo(db.users, {as: 'downloading', foreignKey: 'fk_usuario_imprime', targetKey: 'usuario_id'});
db.duplicates.belongsTo(db.ppersonal, {as: 'jtprequest', foreignKey: 'jtp_solicitud', targetKey: 'ppersonal_id'});
db.duplicates.belongsTo(db.ppersonal, {as: 'jtpapprove', foreignKey: 'jtp_aprueba', targetKey: 'ppersonal_id'});

// LOCALES COMERCIALES
db.plans.belongsTo(db.users, {as: 'user', foreignKey: 'fk_usuario_id', targetKey: 'usuario_id'});
db.plans.belongsTo(db.users, {as: 'inspector', foreignKey: 'fk_usuario_id', targetKey: 'usuario_id'});
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
// BIOSEGURIDAD
db.covid.belongsTo(db.locals, {as: 'local', foreignKey: 'fk_local_id', targetKey: 'local_id'});
db.covid.hasMany(db.covidResources, {as: 'resources', foreignKey: 'fk_bioseguridad_id', targetKey: 'bioseguridad_id'});
db.covidResources.belongsTo(db.covid, {as: 'covid', foreignKey: 'fk_bioseguridad_id', targetKey: 'bioseguridad_id'});
db.covidResources.belongsTo(db.resources, {as: 'src', foreignKey: 'fk_recurso_id', targetKey: 'recurso_id'});

// PLANIFICACION
db.poaprojects.belongsTo(db.programspoa, {as: 'program', foreignKey: 'fk_programa_id', targetKey: 'programa_id'});
db.poaprojects.belongsTo(db.poa, {as: 'poa', foreignKey: 'fk_poa_id', targetKey: 'poa_id'});

// EVALUACIONES DE TALENTO HUMANO
db.surveysEvaluations.belongsTo(db.rsc.forms, {as: 'form', foreignKey: 'fk_formulario_id', targetKey: 'formulario_id'});
db.surveysEvaluations.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.surveysEvaluations.hasMany(db.surveysStaffEvaluations, {as: 'evaluations', foreignKey: 'fk_evaluacion_id', targetKey: 'evaluacion_id'});

db.surveysStaffEvaluations.belongsTo(db.surveysEvaluations, {as: 'evaluation', foreignKey: 'fk_evaluacion_id', targetKey: 'evaluacion_id'});
db.surveysStaffEvaluations.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_evaluado_id', targetKey: 'personal_id'});
db.surveysStaffEvaluations.belongsTo(db.staff, {as: 'personal', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.surveysStaffEvaluationsAnswers.belongsTo(db.surveysStaffEvaluations, {as: 'test', foreignKey: 'fk_test_id', targetKey: 'test_id'});
db.surveysStaffEvaluationsAnswers.belongsTo(db.rsc.formQuestions, {as: 'question', foreignKey: 'fk_pregunta_id', targetKey: 'pregunta_id'});

// EVALUACION DE RIESGO PSICOSOCIAL
db.psychosocialformsSections.belongsTo(db.psychosocialforms, {as: 'form', foreignKey: 'fk_formulario_id', targetKey: 'formulario_id'});
db.psychosocialformsSections.hasMany(db.psychosocialformsQuestions, {as: 'questions', foreignKey: 'fk_seccion_id', targetKey: 'seccion_id'});
db.psychosocialformsQuestions.belongsTo(db.psychosocialformsSections, {as: 'section', foreignKey: 'fk_seccion_id', targetKey: 'seccion_id'});
db.psychosocialformsQuestions.belongsTo(db.resources, {as: 'question', foreignKey: 'fk_pregunta_id', targetKey: 'recurso_id'});
db.psychosocialformsQuestions.belongsTo(db.resources, {as: 'ranking', foreignKey: 'fk_sistemacalificacion_id', targetKey: 'recurso_id'});

db.psychosocialEvaluations.belongsTo(db.psychosocialforms, {as: 'form', foreignKey: 'fk_formulario_id', targetKey: 'formulario_id'});
db.psychosocialformsQuestions.belongsToMany(db.psychosocialEvaluations, {through: 'tb_evaluacionesriesgopsicosocial_preguntas', foreignKey: 'fk_pregunta_id'});
db.psychosocialEvaluations.belongsToMany(db.psychosocialformsQuestions, {through: 'tb_evaluacionesriesgopsicosocial_preguntas', foreignKey: 'fk_evaluacion_id'});
db.psychosocialEvaluationsQuestions.belongsTo(db.psychosocialformsQuestions, {as: 'question', foreignKey: 'fk_pregunta_id', targetKey: 'pregunta_id'});
db.psychosocialEvaluationsQuestions.belongsTo(db.psychosocialEvaluations, {as: 'evaluation', foreignKey: 'fk_evaluacion_id', targetKey: 'evaluacion_id'});

db.psychosocialTest.belongsTo(db.psychosocialEvaluations, {as: 'evaluation', foreignKey: 'fk_evaluacion_id', targetKey: 'evaluacion_id'});
db.psychosocialTest.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_evaluado_id', targetKey: 'personal_id'});
db.psychosocialTestAnswers.belongsTo(db.psychosocialTest, {as: 'test', foreignKey: 'fk_test_id', targetKey: 'test_id'});
db.psychosocialTestAnswers.belongsTo(db.psychosocialformsQuestions, {as: 'question', foreignKey: 'fk_pregunta_id', targetKey: 'pregunta_id'});

// DIRECCIÓN FINANCIERA
db.budgetclassifier.belongsTo(db.budgetclassifier, {as: 'parent', foreignKey: 'fk_parent_id', targetKey: 'clasificador_id'});
db.financialPrograms.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.financialSubprograms.belongsTo(db.financialPrograms, {as: 'program', foreignKey: 'fk_programa_id', targetKey: 'programa_id'});
db.financialProjects.belongsTo(db.financialSubprograms, {as: 'subprogram', foreignKey: 'fk_subprograma_id', targetKey: 'subprograma_id'});
db.financialActivities.belongsTo(db.financialProjects, {as: 'project', foreignKey: 'fk_proyecto_id', targetKey: 'proyecto_id'});
db.financialentities.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.financialtypedocuments.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});

// SUBJEFATURA - APH
db.aphSupplies.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
db.aphSupplycontrol.belongsTo(db.wineries, {as: 'cellar', foreignKey: 'fk_bodega_id', targetKey: 'bodega_id'});
db.aphSupplyMovements.belongsTo(db.aphSupplies, {as: 'supply', foreignKey: 'fk_insumo_id', targetKey: 'insumo_id'});
db.aphSupplyMovements.belongsTo(db.aphSupplycontrol, {as: 'control', foreignKey: 'fk_inventario_id', targetKey: 'inventario_id'});
db.aphSupplyMovements.belongsTo(db.staff, {as: 'staff', foreignKey: 'fk_personal_id', targetKey: 'personal_id'});
// SUBJEFATURA - PARTES
db.attended.belongsTo(db.parts, {as: 'part', foreignKey: 'fk_parte_id', targetKey: 'parte_id'});
db.partSupplies.belongsTo(db.parts, {as: 'part', foreignKey: 'fk_parte_id', targetKey: 'parte_id'});
db.partSupplies.belongsTo(db.aphSupplies, {as: 'supply', foreignKey: 'fk_insumo_id', targetKey: 'insumo_id'});
db.partSupplies.belongsTo(db.wineries, {as: 'cellar', foreignKey: 'fk_bodega_id', targetKey: 'bodega_id'});

// DIRECCION ADMINISTRATIVA
	// ARCHIVO
db.archiveboxes.belongsTo(db.archiveshelving, {as: 'shelving', foreignKey: 'fk_estanteria_id', targetKey: 'estanteria_id'});
db.archivefolder.belongsTo(db.archiveboxes, {as: 'box', foreignKey: 'fk_caja_id', targetKey: 'caja_id'});
db.archivedocuments.belongsTo(db.archivecategories, {as: 'category', foreignKey: 'fk_categoria_id', targetKey: 'categoria_id'});
db.archivedocuments.belongsTo(db.archiveclassification, {as: 'classification', foreignKey: 'fk_clasificacion_id', targetKey: 'clasificacion_id'});
db.archivedocuments.belongsTo(db.archivefolder, {as: 'folder', foreignKey: 'fk_folder_id', targetKey: 'folder_id'});
db.archivedocuments.belongsTo(db.staff, {as: 'send', foreignKey: 'fk_envia_id', targetKey: 'personal_id'});
db.archivedocuments.belongsTo(db.staff, {as: 'receive', foreignKey: 'fk_recibido_id', targetKey: 'personal_id'});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.sequelize.sync({force: false}).then(() => {});

module.exports = db;