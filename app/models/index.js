'use strict';
const moment = require('moment');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) sequelize = new Sequelize(process.env[config.use_env_variable], config);
else sequelize = new Sequelize(config.database, config.username, config.password, config.config);

fs
.readdirSync(__dirname)
.filter(file => {
	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
	const model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;
	
	console.log(model.name);
});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) { 
		db[modelName].associate(db); 
	
		console.log('associate:' + modelName + '' + model.name);
	}
});


require('pg').types.setTypeParser(1114, str => moment(str).format('YYYY-MM-DD HH:mm:ss'));


db.getCurrentDate=function(){ return new Date(); };
db.setDataTable=function(res,data,serviceName = 'dataTable',status = true){
	res.status(200).json({
		estado: status,
		mensaje: serviceName,
		data: data
	});
};
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
	params.forEach((v, k) => { newObj[v] = obj[v];});
	return newObj;
};

// RESOURCES
db.resources = {
	// FORMULARIOS PARA EVALUACION
	forms:				require('./resources/model.forms')(sequelize, Sequelize),
	formSections:		require('./resources/model.forms.sections')(sequelize, Sequelize),
	formQuestions:		require('./resources/model.forms.questions')(sequelize, Sequelize),
	// ARCHIVOS ADJUNTOS
	gallery:			require('./resources/model.gallery')(sequelize, Sequelize),
	// OTROS
	resources:			require('./resources/model.resources')(sequelize, Sequelize),
	coordinates:		require('./resources/model.coordinates')(sequelize, Sequelize),
	geojson:			require('./resources/model.geojson')(sequelize, Sequelize),
	countries:			require('./resources/model.countries')(sequelize, Sequelize),
	states:				require('./resources/model.states')(sequelize, Sequelize),
	cities:				require('./resources/model.cities')(sequelize, Sequelize),
	towns:				require('./resources/model.towns')(sequelize, Sequelize),
	parishes:			require('./resources/model.parishes')(sequelize, Sequelize),
	persons:			require('./resources/model.persons')(sequelize, Sequelize),
	vehicles:			require('./resources/model.vehicles')(sequelize, Sequelize),
	driverlicenses:		require('./resources/model.driverlicenses')(sequelize, Sequelize)
};
// ADMINISTRACION
db.admin = {
	labels:				require('./admin/model.labels')(sequelize, Sequelize),
	parameters:			require('./admin/model.parameters')(sequelize, Sequelize),
	webmail:			require('./admin/model.webmail')(sequelize, Sequelize),
	reports:			require('./admin/model.reports')(sequelize, Sequelize),
	profiles:			require('./admin/model.profiles')(sequelize, Sequelize),
	users:				require('./admin/model.users')(sequelize, Sequelize)
};
// PERMISOS
db.permits = {
	activities:					require('./permits/model.activities')(sequelize, Sequelize),
	taxes:						require('./permits/model.taxes')(sequelize, Sequelize),
	ciiu:						require('./permits/model.ciiu')(sequelize, Sequelize),
	entities:					require('./permits/model.entities')(sequelize, Sequelize),
	locals:						require('./permits/model.locals')(sequelize, Sequelize),
	employees:					require('./permits/model.employees')(sequelize, Sequelize),
	selfInspections:			require('./permits/model.selfinspections')(sequelize, Sequelize),
	permitsLocals:				require('./permits/model.permits')(sequelize, Sequelize),
	duplicates:					require('./permits/model.duplicates')(sequelize, Sequelize)
};
// UNIDAD DE PREVENCION E INGENIERIA DEL FUEGO
db.prevention = {
	// BIOSEGURIDAD
	covid:						require('./prevention/biosecurity/model.covid')(sequelize, Sequelize),
	covidResources:				require('./prevention/biosecurity/model.covid.resources')(sequelize, Sequelize),
	// PLANES DE AUTOPROTECCION
	plans:						require('./prevention/selfprotectionplans/model.plans')(sequelize, Sequelize),
	planInspectors:				require('./prevention/selfprotectionplans/model.plans.inspectors')(sequelize, Sequelize),
	brigades:					require('./prevention/selfprotectionplans/model.brigades')(sequelize, Sequelize),
	brigadists:					require('./prevention/selfprotectionplans/model.brigadists')(sequelize, Sequelize),
	selfProtectionAnnexes:		require('./prevention/selfprotectionplans/model.selfprotection.annexes')(sequelize, Sequelize),
	selfProtectionFactors:		require('./prevention/selfprotectionplans/model.selfprotection.factors')(sequelize, Sequelize),
	selfProtectionPrevention:	require('./prevention/selfprotectionplans/model.selfprotection.prevention')(sequelize, Sequelize),
	selfProtectionMaintenance:	require('./prevention/selfprotectionplans/model.selfprotection.maintenances')(sequelize, Sequelize),
	selfProtectionMeseri:		require('./prevention/selfprotectionplans/model.selfprotection.meseri')(sequelize, Sequelize),
	extensions:					require('./prevention/inspections/model.extensions')(sequelize, Sequelize),
	// INSPECCIONES
	inspections:				require('./prevention/inspections/model.inspections')(sequelize, Sequelize),
	inspectionInspector:		require('./prevention/inspections/model.inspection.inspector')(sequelize, Sequelize),
	inspectionLocal:			require('./prevention/inspections/model.inspection.local')(sequelize, Sequelize),
	reinspections:				require('./prevention/inspections/model.reinspections')(sequelize, Sequelize),
	// GLP
	tglp:						require('./prevention/glp/model.transport')(sequelize, Sequelize),
	tglpInspector:				require('./prevention/glp/model.transport.inspector')(sequelize, Sequelize),
	tglpResources:				require('./prevention/glp/model.transport.resources')(sequelize, Sequelize),
	// CAPACITACIONES CIUDADANAS
	trainingTopics:				require('./prevention/trainings/model.topics')(sequelize, Sequelize),
	trainings:					require('./prevention/trainings/model.trainings')(sequelize, Sequelize),
	stands:						require('./prevention/trainings/model.stands')(sequelize, Sequelize),
	visits:						require('./prevention/trainings/model.visits')(sequelize, Sequelize),
	simulations:				require('./prevention/trainings/model.simulations')(sequelize, Sequelize)
};
// DIRECCION DE TALENTO HUMANO
db.tthh = {
	// INSTITUTCION & PARAMETRICACION
	stations:					require('./tthh/institution/model.stations')(sequelize, Sequelize),
	academicTraining:			require('./tthh/model.academicTraining')(sequelize, Sequelize),
	workdays:					require('./tthh/model.workdays')(sequelize, Sequelize),
	scheduleworkdays:			require('./tthh/model.scheduleworkdays')(sequelize, Sequelize),
	leaderships:				require('./tthh/institution/model.leaderships')(sequelize, Sequelize),
	jobs:						require('./tthh/institution/model.jobs')(sequelize, Sequelize),
	staff:						require('./tthh/model.staff')(sequelize, Sequelize),
	ppersonal:					require('./tthh/model.ppersonal')(sequelize, Sequelize),
	operators:					require('./tthh/model.operators')(sequelize, Sequelize),
	biometricPeriods:			require('./tthh/attendance/model.biometricPeriods')(sequelize, Sequelize),
	biometricMarkings:			require('./tthh/attendance/model.biometricMarkings')(sequelize, Sequelize),
	typeAdvances:				require('./tthh/model.typeadvances')(sequelize, Sequelize),
	typeContracts:				require('./tthh/model.typecontracts')(sequelize, Sequelize),
	wineries:					require('./tthh/institution/model.wineries')(sequelize, Sequelize),
	// CONTROL DE ASISTENCIA
	absences:					require('./tthh/attendance/model.absences')(sequelize, Sequelize),
	absencesControl:			require('./tthh/attendance/model.absences.control')(sequelize, Sequelize),
	// DEP. MEDICO
	medicines:					require('./tthh/md/model.medicines')(sequelize, Sequelize),
	inventoryMedicines:			require('./tthh/md/model.inventory')(sequelize, Sequelize),
	medicalrestRecipients:		require('./tthh/md/model.medicalrest.recipients')(sequelize, Sequelize),
	// EVAUACIONES
	surveysEvaluations:					require('./tthh/surveys/model.evaluations')(sequelize, Sequelize),
	surveysStaffEvaluations:			require('./tthh/surveys/model.staff.evaluation')(sequelize, Sequelize),
	surveysStaffEvaluationsAnswers:		require('./tthh/surveys/model.staff.evaluation.answers')(sequelize, Sequelize),
	// SOS
	psychosocialforms:					require('./tthh/sos/model.psychosocial.forms')(sequelize, Sequelize),
	psychosocialformsSections:			require('./tthh/sos/model.psychosocial.sections')(sequelize, Sequelize),
	psychosocialformsQuestions:			require('./tthh/sos/model.psychosocial.forms.questions')(sequelize, Sequelize),
	psychosocialEvaluations:			require('./tthh/sos/model.psychosocial.evaluation')(sequelize, Sequelize),
	psychosocialEvaluationsQuestions:	require('./tthh/sos/model.psychosocial.evaluation.questions')(sequelize, Sequelize),
	psychosocialTest:					require('./tthh/sos/model.psychosocial.test')(sequelize, Sequelize),
	psychosocialTestAnswers:			require('./tthh/sos/model.psychosocial.test.answers')(sequelize, Sequelize)
};
// DIRECCION ADMINISTRATIVA
db.administrative = {
	// ARCHIVO
	archiveshelving:			require('./administrative/archive/model.shelving')(sequelize, Sequelize),
	archiveboxes:				require('./administrative/archive/model.boxes')(sequelize, Sequelize),
	archivecategories:			require('./administrative/archive/model.categories')(sequelize, Sequelize),
	archiveclassification:		require('./administrative/archive/model.classification')(sequelize, Sequelize),
	archivefolder:				require('./administrative/archive/model.folder')(sequelize, Sequelize),
	archivedocuments:			require('./administrative/archive/model.documents')(sequelize, Sequelize)
};
// PLANIFICACION
db.planing = {
	programspoa:				require('./planing/model.programs')(sequelize, Sequelize),
	poa:						require('./planing/model.poa')(sequelize, Sequelize),
	poaprojects:				require('./planing/model.poaprojects')(sequelize, Sequelize)
};
// FINANCIERO
db.financial = {
	budgetclassifier:			require('./financial/model.budgetClassifier')(sequelize, Sequelize),
	accountcatalog:				require('./financial/model.accountCatalog')(sequelize, Sequelize),
	retentionclassifier:		require('./financial/model.retentionClassifier')(sequelize, Sequelize),
	financialPrograms:			require('./financial/model.programs')(sequelize, Sequelize),
	financialSubprograms:		require('./financial/model.subprograms')(sequelize, Sequelize),
	financialProjects:			require('./financial/model.projects')(sequelize, Sequelize),
	financialActivities:		require('./financial/model.activities')(sequelize, Sequelize),
	financialentities:			require('./financial/model.entities')(sequelize, Sequelize),
	financialtypedocuments:		require('./financial/model.typedocuments')(sequelize, Sequelize),
	contractingprocedures:		require('./financial/model.contractingprocedures')(sequelize, Sequelize)
};
// SUBJEFATURA
db.subjefature = {
	// UNIDAD ATENCIÓN PREHOSPITALARIA
	aphSupplies:				require('./subjefature/aph/model.aph.supplies')(sequelize, Sequelize),
	aphSupplycontrol:			require('./subjefature/aph/model.aph.supplycontrol')(sequelize, Sequelize),
	aphSupplyMovements:			require('./subjefature/aph/model.aph.supplycontrolmovements')(sequelize, Sequelize),
	// PARTES
	parts:						require('./subjefature/model.parts')(sequelize, Sequelize),
	attended:					require('./subjefature/model.attended')(sequelize, Sequelize),
	partSupplies:				require('./subjefature/model.aphsupplies')(sequelize, Sequelize)
};


/*
 * ASSOCIATION
 */
Object.keys(db.resources).forEach(modelName => { if (db.resources[modelName].associate) db.resources[modelName].associate(db.resources); });
Object.keys(db.admin).forEach(modelName => { if (db.admin[modelName].associate) db.admin[modelName].associate(db.admin); });
Object.keys(db.permits).forEach(modelName => { if (db.permits[modelName].associate) db.permits[modelName].associate(db.permits); });
Object.keys(db.prevention).forEach(modelName => { if (db.prevention[modelName].associate) db.prevention[modelName].associate(db.prevention); });
Object.keys(db.tthh).forEach(modelName => { if (db.tthh[modelName].associate) db.tthh[modelName].associate(db.tthh); });
Object.keys(db.administrative).forEach(modelName => { if (db.administrative[modelName].associate) db.administrative[modelName].associate(db.administrative); });
Object.keys(db.planing).forEach(modelName => { if (db.planing[modelName].associate) db.planing[modelName].associate(db.planing); });
Object.keys(db.financial).forEach(modelName => { if (db.financial[modelName].associate) db.financial[modelName].associate(db.financial); });
Object.keys(db.subjefature).forEach(modelName => { if (db.subjefature[modelName].associate) db.subjefature[modelName].associate(db.subjefature); });


/*
 * RESOURCES
 */
// ASOCIACION DE MODELOS
db.resources.states.belongsTo(db.resources.countries, {foreignKey: 'fk_country_id'});
db.resources.cities.belongsTo(db.resources.states, {foreignKey: 'fk_state_id'});
db.resources.towns.belongsTo(db.resources.states, {foreignKey: 'fk_state_id'});
db.resources.parishes.belongsTo(db.resources.towns, {foreignKey: 'fk_town_id'});
db.resources.persons.hasMany(db.tthh.academicTraining, {as: 'training', foreignKey: 'fk_persona_id'});
db.resources.resources.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
// VEHICULOS
db.resources.vehicles.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.resources.vehicles.belongsTo(db.resources.persons, {as: 'owner', foreignKey: 'propietario_id'});
// FORMULARIOS DE EVALUACION
db.resources.forms.belongsTo(db.tthh.staff, {as: 'user', foreignKey: 'fk_personal_id'});
db.resources.formSections.belongsTo(db.tthh.staff, {as: 'user', foreignKey: 'fk_personal_id'});
db.resources.formSections.belongsTo(db.resources.forms, {as: 'form', foreignKey: 'fk_formulario_id'});
db.resources.formSections.hasMany(db.resources.formQuestions, {as: 'questions', foreignKey: 'fk_seccion_id'});
db.resources.formQuestions.belongsTo(db.tthh.staff, {as: 'user', foreignKey: 'fk_personal_id'});
db.resources.formQuestions.belongsTo(db.resources.formSections, {as: 'section', foreignKey: 'fk_seccion_id'});
db.resources.formQuestions.belongsTo(db.resources.resources, {as: 'rating', foreignKey: 'fk_sistemacalificacion_id'});
// GALERIA - ADJUNTOS
db.resources.gallery.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});


/*
 * ADMIN
 */
db.admin.users.belongsTo(db.admin.profiles, {as: 'profile', foreignKey: 'fk_perfil_id'});
db.admin.users.belongsTo(db.resources.persons, {as: 'person', foreignKey: 'fk_persona_id'});


/*
 * TALENTO HUMANO
 */
// INSTITUCION
db.tthh.stations.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.tthh.leaderships.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.tthh.leaderships.belongsTo(db.tthh.leaderships, {as: 'leadership', foreignKey: 'fk_direccion_id'});
db.tthh.jobs.belongsTo(db.tthh.leaderships, {as: 'leadership', foreignKey: 'fk_direccion_id'});
db.tthh.jobs.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
// BODEGAS
db.tthh.academicTraining.belongsTo(db.resources.persons, {as: 'person', foreignKey: 'fk_persona_id'});
db.tthh.wineries.belongsTo(db.tthh.stations, {as: 'station', foreignKey: 'fk_estacion_id'});
// PARAMETRICACION
db.tthh.workdays.hasMany(db.tthh.scheduleworkdays, {as: 'schedules', foreignKey: 'fk_jornada_id'});
db.tthh.scheduleworkdays.belongsTo(db.tthh.workdays, {as: 'workday', foreignKey: 'fk_jornada_id'});
db.tthh.typeContracts.belongsTo(db.tthh.typeAdvances, {as: 'advance', foreignKey: 'fk_tipoanticipo_id'});
// PERSONAL
db.tthh.staff.belongsTo(db.resources.persons, {as: 'person', foreignKey: 'fk_persona_id'});
db.tthh.staff.belongsTo(db.tthh.stations, {as: 'station', foreignKey: 'fk_estacion_id'});
db.tthh.staff.belongsTo(db.tthh.workdays, {as: 'workday', foreignKey: 'fk_jornada_id'});
db.tthh.ppersonal.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_personal_id'});
db.tthh.ppersonal.belongsTo(db.tthh.jobs, {as: 'job', foreignKey: 'fk_puesto_id'});
db.tthh.operators.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_personal_id'});
db.tthh.operators.belongsTo(db.resources.driverlicenses, {as: 'license', foreignKey: 'fk_licencia_id'});
// DEPARTAMENTO MEDICO
db.tthh.medicalrestRecipients.belongsTo(db.tthh.staff, {as: 'responsible', foreignKey: 'fk_personal_id'});
db.tthh.medicalrestRecipients.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_destinatario_id'});
db.tthh.inventoryMedicines.belongsTo(db.tthh.medicines, {as: 'medicine', foreignKey: 'fk_medicamento_id'});
// CONTROL DE ASISTENCIA
db.tthh.biometricPeriods.hasMany(db.tthh.biometricMarkings, {as: 'markings', foreignKey: 'fk_periodo_id'});
db.tthh.biometricMarkings.belongsTo(db.tthh.biometricPeriods, {as: 'period', foreignKey: 'fk_periodo_id'});
db.tthh.biometricMarkings.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_biometrico_id'});
db.tthh.biometricMarkings.belongsTo(db.tthh.stations, {as: 'station', foreignKey: 'fk_estacion_id'});
db.tthh.biometricMarkings.belongsTo(db.tthh.workdays, {as: 'workday', foreignKey: 'fk_jornada_id'});
db.tthh.absences.belongsTo(db.tthh.staff, {as: 'responsible', foreignKey: 'fk_personal_id'});
db.tthh.absences.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_faltante_id'});
db.tthh.absences.belongsTo(db.tthh.staff, {as: 'register', foreignKey: 'fk_registra_id'});
db.tthh.absences.belongsTo(db.tthh.staff, {as: 'justifie', foreignKey: 'fk_justifica_id'});
db.tthh.absences.hasMany(db.tthh.absencesControl, {as: 'control', foreignKey: 'fk_inasistencia_id'});
db.tthh.absencesControl.belongsTo(db.tthh.absences, {as: 'absence', foreignKey: 'fk_inasistencia_id'});
db.tthh.absencesControl.belongsTo(db.tthh.staff, {as: 'responsible', foreignKey: 'fk_personal_id'});
// EVALUACIONES DE TALENTO HUMANO
db.tthh.surveysEvaluations.belongsTo(db.resources.forms, {as: 'form', foreignKey: 'fk_formulario_id'});
db.tthh.surveysEvaluations.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_personal_id'});
db.tthh.surveysEvaluations.hasMany(db.tthh.surveysStaffEvaluations, {as: 'evaluations', foreignKey: 'fk_evaluacion_id'});
db.tthh.surveysStaffEvaluations.belongsTo(db.tthh.surveysEvaluations, {as: 'evaluation', foreignKey: 'fk_evaluacion_id'});
db.tthh.surveysStaffEvaluations.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_evaluado_id'});
db.tthh.surveysStaffEvaluations.belongsTo(db.tthh.staff, {as: 'personal', foreignKey: 'fk_personal_id'});
db.tthh.surveysStaffEvaluationsAnswers.belongsTo(db.tthh.surveysStaffEvaluations, {as: 'test', foreignKey: 'fk_test_id'});
db.tthh.surveysStaffEvaluationsAnswers.belongsTo(db.resources.formQuestions, {as: 'question', foreignKey: 'fk_pregunta_id'});
// EVALUACION DE RIESGO PSICOSOCIAL
db.tthh.psychosocialformsSections.belongsTo(db.tthh.psychosocialforms, {as: 'form', foreignKey: 'fk_formulario_id'});
db.tthh.psychosocialformsSections.hasMany(db.tthh.psychosocialformsQuestions, {as: 'questions', foreignKey: 'fk_seccion_id'});
db.tthh.psychosocialformsQuestions.belongsTo(db.tthh.psychosocialformsSections, {as: 'section', foreignKey: 'fk_seccion_id'});
db.tthh.psychosocialformsQuestions.belongsTo(db.resources.resources, {as: 'question', foreignKey: 'fk_pregunta_id'});
db.tthh.psychosocialformsQuestions.belongsTo(db.resources.resources, {as: 'ranking', foreignKey: 'fk_sistemacalificacion_id'});
db.tthh.psychosocialEvaluations.belongsTo(db.tthh.psychosocialforms, {as: 'form', foreignKey: 'fk_formulario_id'});
db.tthh.psychosocialformsQuestions.belongsToMany(db.tthh.psychosocialEvaluations, {through: 'tb_evaluacionesriesgopsicosocial_preguntas', foreignKey: 'fk_pregunta_id'});
db.tthh.psychosocialEvaluations.belongsToMany(db.tthh.psychosocialformsQuestions, {through: 'tb_evaluacionesriesgopsicosocial_preguntas', foreignKey: 'fk_evaluacion_id'});
db.tthh.psychosocialEvaluationsQuestions.belongsTo(db.tthh.psychosocialformsQuestions, {as: 'question', foreignKey: 'fk_pregunta_id'});
db.tthh.psychosocialEvaluationsQuestions.belongsTo(db.tthh.psychosocialEvaluations, {as: 'evaluation', foreignKey: 'fk_evaluacion_id'});
db.tthh.psychosocialTest.belongsTo(db.tthh.psychosocialEvaluations, {as: 'evaluation', foreignKey: 'fk_evaluacion_id'});
db.tthh.psychosocialTest.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_evaluado_id'});
db.tthh.psychosocialTestAnswers.belongsTo(db.tthh.psychosocialTest, {as: 'test', foreignKey: 'fk_test_id'});
db.tthh.psychosocialTestAnswers.belongsTo(db.tthh.psychosocialformsQuestions, {as: 'question', foreignKey: 'fk_pregunta_id'});


/*
 * PERMISOS DE FUNCIONAMIENTO
 */
// ENTIDADES
db.permits.entities.belongsTo(db.resources.persons, {as: 'person', foreignKey: 'fk_representante_id'});
db.permits.entities.belongsTo(db.resources.persons, {as: 'adopted', foreignKey: 'fk_apoderado_id'});
db.permits.entities.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
// PERMISOS
db.permits.taxes.belongsTo(db.permits.activities, {as: 'activity', foreignKey: 'fk_actividad_id'});
db.permits.ciiu.belongsTo(db.permits.taxes, {as: 'taxe', foreignKey: 'fk_tasa_id'});
db.permits.locals.belongsTo(db.permits.entities, {as: 'entity', foreignKey: 'fk_entidad_id'});
db.permits.locals.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.permits.locals.belongsTo(db.permits.ciiu, {as: 'ciiu', foreignKey: 'fk_ciiu_id'});
db.permits.locals.hasOne(db.resources.coordinates, {as: 'coordinates', constraints: false, foreignKey: 'coordenada_entidad_id'});
db.permits.selfInspections.belongsTo(db.permits.locals, {as: 'local', foreignKey: 'fk_local_id'});
db.permits.permitsLocals.belongsTo(db.permits.selfInspections, {as: 'selfInspection', foreignKey: 'fk_autoinspeccion_id'});
db.permits.permitsLocals.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.permits.permitsLocals.hasMany(db.permits.duplicates, {as: 'duplicates', foreignKey: 'fk_permiso_id'});
// LISTADO DE EMPLEADOS DE LOCALES
db.permits.employees.belongsTo(db.resources.persons, {as: 'person', foreignKey: 'fk_persona_id'});
db.permits.employees.belongsTo(db.permits.locals, {as: 'local', foreignKey: 'fk_local_id'});
db.permits.employees.hasMany(db.prevention.brigadists, {as: 'brigade', foreignKey: 'fk_empleado_id', targetKey: 'empleado_id', onDelete: 'CASCADE', hooks:true});
// DUPLICADOS
db.permits.duplicates.belongsTo(db.permits.permitsLocals, {as: 'permit', foreignKey: 'fk_permiso_id'});
db.permits.duplicates.belongsTo(db.admin.users, {as: 'requesting', foreignKey: 'fk_usuario_solicita'});
db.permits.duplicates.belongsTo(db.admin.users, {as: 'approving', foreignKey: 'fk_usuario_aprueba'});
db.permits.duplicates.belongsTo(db.admin.users, {as: 'downloading', foreignKey: 'fk_usuario_imprime'});
db.permits.duplicates.belongsTo(db.tthh.ppersonal, {as: 'jtprequest', foreignKey: 'jtp_solicitud'});
db.permits.duplicates.belongsTo(db.tthh.ppersonal, {as: 'jtpapprove', foreignKey: 'jtp_aprueba'});


/*
 * PREVENCIÓN
 */
// BIOSEGURIDAD
db.prevention.covid.belongsTo(db.permits.locals, {as: 'local', foreignKey: 'fk_local_id'});
db.prevention.covid.hasMany(db.prevention.covidResources, {as: 'resources', foreignKey: 'fk_bioseguridad_id'});
db.prevention.covidResources.belongsTo(db.prevention.covid, {as: 'covid', foreignKey: 'fk_bioseguridad_id'});
db.prevention.covidResources.belongsTo(db.resources.resources, {as: 'src', foreignKey: 'fk_recurso_id'});
// INSPECCIONES
db.prevention.inspections.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.prevention.inspections.belongsTo(db.resources.persons, {as: 'applicant', foreignKey: 'fk_solicitante_id'});
db.prevention.inspections.belongsTo(db.resources.persons, {as: 'enterviewed', foreignKey: 'fk_entrevistado_id'});
// INSPECCIONES - LOCALES
db.prevention.inspections.hasMany(db.prevention.inspectionLocal, {as: 'locals', foreignKey: 'fk_inspeccion_id'});
db.prevention.inspectionLocal.belongsTo(db.prevention.inspections, {as: 'inspection', foreignKey: 'fk_inspeccion_id'});
db.prevention.inspectionLocal.belongsTo(db.permits.locals, {as: 'local', foreignKey: 'fk_local_id'});
// INSPECCIONES - INSPECTORES
db.prevention.inspections.hasMany(db.prevention.inspectionInspector, {as: 'inspectors', foreignKey: 'fk_inspeccion_id'});
db.prevention.inspectionInspector.belongsTo(db.prevention.inspections, {as: 'inspection', foreignKey: 'fk_inspeccion_id',});
db.prevention.inspectionInspector.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_inspector_id'});
// REINSPECCIONES
db.prevention.reinspections.belongsTo(db.prevention.inspections, {as: 'inspection', foreignKey: 'fk_inspeccion_id'});
// TRANSPORTE DE GLP
db.prevention.tglp.belongsTo(db.permits.permitsLocals, {as: 'permit', foreignKey: 'fk_permiso_id'});
db.prevention.tglp.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.prevention.tglp.belongsTo(db.admin.users, {as: 'inspector', foreignKey: 'fk_inspector_id'});
db.prevention.tglp.belongsTo(db.resources.vehicles, {as: 'vehicle', foreignKey: 'fk_vehiculo_id'});
// TRANSPORTE GLP RELACIONES
db.prevention.tglp.hasMany(db.prevention.tglpInspector, {as: 'inspectors', foreignKey: 'fk_tglp_id'});
db.prevention.tglpInspector.belongsTo(db.prevention.tglp, {as: 'transport', foreignKey: 'fk_tglp_id'});
db.prevention.tglpInspector.belongsTo(db.tthh.ppersonal, {as: 'ppersonal', foreignKey: 'fk_personal_id'});
db.prevention.tglp.hasMany(db.prevention.tglpResources, {as: 'resources', foreignKey: 'fk_transporte_id'});
db.prevention.tglpResources.belongsTo(db.prevention.tglp, {as: 'transport', foreignKey: 'fk_transporte_id'});
db.prevention.tglpResources.belongsTo(db.resources.resources, {as: 'src', foreignKey: 'fk_recurso_id'});
// AUTOPROTECCION
db.prevention.selfProtectionMaintenance.belongsTo(db.permits.entities, {as: 'professional', foreignKey: 'mantenimiento_responsable_id'});
db.resources.resources.hasMany(db.prevention.selfProtectionMaintenance, {as: 'maintenance', foreignKey: 'fk_recurso_id'});
db.prevention.selfProtectionMaintenance.belongsTo(db.resources.resources, {as: 'resource', foreignKey: 'fk_recurso_id'});
// PLANES DE AUTOPROTECCION
db.prevention.plans.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.prevention.plans.belongsTo(db.admin.users, {as: 'inspector', foreignKey: 'fk_usuario_id'});
db.prevention.plans.belongsTo(db.permits.locals, {as: 'local', foreignKey: 'fk_local_id'});
db.prevention.plans.belongsTo(db.permits.entities, {as: 'billing', foreignKey: 'facturacion_id'});
db.prevention.plans.belongsTo(db.resources.persons, {as: 'responsable', foreignKey: 'fk_responsable_tramite'});
db.prevention.plans.belongsTo(db.resources.persons, {as: 'sos', foreignKey: 'fk_sos_id'});
db.prevention.plans.belongsTo(db.tthh.academicTraining, {as: 'training', foreignKey: 'profesional_sos_id'});
db.prevention.plans.hasMany(db.resources.gallery, {as: 'gallery', foreignKey: 'fk_id', targetKey: 'plan_id'});

db.prevention.plans.hasMany(db.prevention.planInspectors, {as: 'inspectors', foreignKey: 'fk_plan_id'});
db.prevention.planInspectors.belongsTo(db.prevention.plans, {as: 'plan', foreignKey: 'fk_plan_id'});

db.prevention.planInspectors.belongsTo(db.tthh.ppersonal, {as: 'ppersonal', foreignKey: 'fk_personal_id'});
// BRIGADAS Y BRIGADISTAS
db.prevention.brigades.belongsTo(db.permits.locals, {as: 'local', foreignKey: 'fk_local_id'});
db.prevention.brigades.belongsTo(db.resources.persons, {as: 'responsable', foreignKey: 'fk_responsable_id'});
db.prevention.brigades.belongsTo(db.resources.persons, {as: 'junior', foreignKey: 'fk_subalterno_id'});
db.prevention.brigades.hasMany(db.prevention.brigadists, {as: 'brigadist', foreignKey: 'fk_brigada_id'});
db.prevention.brigadists.belongsTo(db.permits.employees, {as: 'employee', foreignKey: 'fk_empleado_id'});
db.prevention.brigadists.belongsTo(db.prevention.brigades, {as: 'brigade', foreignKey: 'fk_brigada_id'});
// PRORROGAS
db.prevention.extensions.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.prevention.extensions.belongsTo(db.prevention.inspections, {as: 'inspection', foreignKey: 'fk_inspeccion_id'});
db.prevention.extensions.belongsTo(db.resources.persons, {as: 'requested', foreignKey: 'prorroga_solicitante'});
db.prevention.extensions.belongsTo(db.tthh.ppersonal, {as: 'authorize', foreignKey: 'fk_autoriza_id'});
// CAPACITACIONES CIUDADANAS
db.prevention.trainings.belongsTo(db.prevention.trainingTopics, {as: 'topic', foreignKey: 'fk_tema_id'});
db.prevention.trainings.belongsTo(db.permits.entities, {as: 'entity', foreignKey: 'fk_entidad_id'});
db.prevention.trainings.belongsTo(db.resources.persons, {as: 'requested', foreignKey: 'fk_persona_id'});
db.prevention.trainings.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.prevention.stands.belongsTo(db.permits.entities, {as: 'entity', foreignKey: 'fk_entidad_id'});
db.prevention.stands.belongsTo(db.resources.persons, {as: 'requested', foreignKey: 'fk_persona_id'});
db.prevention.stands.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.prevention.visits.belongsTo(db.permits.entities, {as: 'entity', foreignKey: 'fk_entidad_id'});
db.prevention.visits.belongsTo(db.resources.persons, {as: 'requested', foreignKey: 'fk_persona_id'});
db.prevention.visits.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});
db.prevention.simulations.belongsTo(db.permits.entities, {as: 'entity', foreignKey: 'fk_entidad_id'});
db.prevention.simulations.belongsTo(db.resources.persons, {as: 'requested', foreignKey: 'fk_persona_id'});
db.prevention.simulations.belongsTo(db.admin.users, {as: 'user', foreignKey: 'fk_usuario_id'});


/*
 * PLANIFICACIÓN
 */
// POA
db.planing.poaprojects.belongsTo(db.planing.programspoa, {as: 'program', foreignKey: 'fk_programa_id'});
db.planing.poaprojects.belongsTo(db.planing.poa, {as: 'poa', foreignKey: 'fk_poa_id'});


/*
 * FINANCIERO
 */
// CATALOGO DE CUENTAS
db.financial.budgetclassifier.belongsTo(db.financial.budgetclassifier, {as: 'parent', foreignKey: 'fk_parent_id'});
db.financial.financialPrograms.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_personal_id'});
db.financial.financialSubprograms.belongsTo(db.financial.financialPrograms, {as: 'program', foreignKey: 'fk_programa_id'});
db.financial.financialProjects.belongsTo(db.financial.financialSubprograms, {as: 'subprogram', foreignKey: 'fk_subprograma_id'});
db.financial.financialActivities.belongsTo(db.financial.financialProjects, {as: 'project', foreignKey: 'fk_proyecto_id'});
db.financial.financialentities.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_personal_id'});
db.financial.financialtypedocuments.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_personal_id'});


/*
 * SUBJEFATURA
 */
// APH
db.subjefature.aphSupplies.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_personal_id'});
db.subjefature.aphSupplycontrol.belongsTo(db.tthh.wineries, {as: 'cellar', foreignKey: 'fk_bodega_id'});
db.subjefature.aphSupplyMovements.belongsTo(db.subjefature.aphSupplies, {as: 'supply', foreignKey: 'fk_insumo_id'});
db.subjefature.aphSupplyMovements.belongsTo(db.subjefature.aphSupplycontrol, {as: 'control', foreignKey: 'fk_inventario_id'});
db.subjefature.aphSupplyMovements.belongsTo(db.tthh.staff, {as: 'staff', foreignKey: 'fk_personal_id'});
// PARTES
db.subjefature.attended.belongsTo(db.subjefature.parts, {as: 'part', foreignKey: 'fk_parte_id'});
db.subjefature.partSupplies.belongsTo(db.subjefature.parts, {as: 'part', foreignKey: 'fk_parte_id'});
db.subjefature.partSupplies.belongsTo(db.subjefature.aphSupplies, {as: 'supply', foreignKey: 'fk_insumo_id'});
db.subjefature.partSupplies.belongsTo(db.tthh.wineries, {as: 'cellar', foreignKey: 'fk_bodega_id'});


/*
 * DIRECCIÓN ADMINISTRATIVA
 */
// ARCHIVO
db.administrative.archiveboxes.belongsTo(db.administrative.archiveshelving, {as: 'shelving', foreignKey: 'fk_estanteria_id'});
db.administrative.archivefolder.belongsTo(db.administrative.archiveboxes, {as: 'box', foreignKey: 'fk_caja_id'});
db.administrative.archivedocuments.belongsTo(db.administrative.archivecategories, {as: 'category', foreignKey: 'fk_categoria_id'});
db.administrative.archivedocuments.belongsTo(db.administrative.archiveclassification, {as: 'classification', foreignKey: 'fk_clasificacion_id'});
db.administrative.archivedocuments.belongsTo(db.administrative.archivefolder, {as: 'folder', foreignKey: 'fk_folder_id'});
db.administrative.archivedocuments.belongsTo(db.tthh.staff, {as: 'send', foreignKey: 'fk_envia_id'});
db.administrative.archivedocuments.belongsTo(db.tthh.staff, {as: 'receive', foreignKey: 'fk_recibido_id'});


// INICIALIZAR SEQUELIZE
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.sequelize.sync({force: false}).then(() => {});

// EXPORTAR MODELO
module.exports = db;