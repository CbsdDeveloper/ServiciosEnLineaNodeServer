'use strict';
const db = require('../models');
const sql = db.sequelize;

// BUSCAR INSPECCIONES POR ID DE ENTIDAD
exports.inspectionsByEntity = (req, res, next) => {
    var filterParams = { 
		replacements: req.body, 
		type: sql.QueryTypes.SELECT
	};
	sql.query("SELECT * FROM prevencion.vw_inspecciones WHERE fk_entidad_id = :entityId", filterParams).then(function (data) {
        db.setJSON(res,data,'INSPECCIONES POR ID DE ENTIDAD');
    }).catch(function (err) {return next(err);});
};

// BUSCAR PLAN DE EMERGENCIA POR ID DE LOCAL
exports.findPlanByLocalId = (req, res, next) => {
    var filterParams = { 
		replacements: req.body, 
		type: sql.QueryTypes.SELECT
	};
	sql.query("SELECT * FROM prevencion.vw_inspecciones WHERE fk_entidad_id = :entityId", filterParams).then(function (data) {
        db.setJSON(res,data,'INSPECCIONES POR ID DE ENTIDAD');
    }).catch(function (err) {return next(err);});
};

// PERSONAL PARA CAPACITACIONES
exports.findParticipantsByEntityId = (req, res, next) => {
    var filterParams = { 
		replacements: req.body, 
		type: sql.QueryTypes.SELECT
	};
	sql.query("SELECT * FROM prevencion.vw_participantes WHERE fk_entidad_id = :entityId", filterParams).then(function (data) {
        db.setJSON(res,data,'PERSONAL PARA CAPACITACIONES SEGUN ID DE ENTIDAD');
    }).catch(function (err) {return next(err);});
};

// PERSONAL PARA CAPACITACIONES
exports.findParticipantsByTrainingId = (req, res, next) => {
    var filterParams = { 
		replacements: req.body, 
		type: sql.QueryTypes.SELECT
	};
	var model=[];
	sql.query("SELECT * FROM prevencion.tb_training_has_people WHERE fk_capacitacion_id = :trainingId", filterParams).then(function (data) {
		// INSERTAR ID DE PARTICIPANTES
		data.forEach(v => { model.push(v.fk_participante_id); });
		// ENVIAR RESPUESTA
        db.setJSON(res,model,'PERSONAL SELECCIONADO PARA UNA CAPACITACIONES');
    }).catch(function (err) {return next(err);});
};

// BUSCAR PERMISOS POR ID DE LOCAL
exports.findTrainingsByEntity = (req, res) => {
	var filterParams = { 
		replacements: req.body, 
		type: sql.QueryTypes.SELECT
	};

	// LISTADO DE SIMULACROS
	sql.query("SELECT * FROM prevencion.vw_simulacros WHERE fk_entidad_id = :entityId AND simulacro_estado NOT IN ('ANULADA') ORDER BY simulacro_codigo DESC", filterParams).then(function (simulations) {
		//LISTADO DE STANDS
		sql.query("SELECT * FROM prevencion.vw_stands WHERE fk_entidad_id = :entityId AND stand_estado NOT IN ('ANULADA') ORDER BY stand_codigo DESC", filterParams).then(function (stands) {
			// LISTADO DE CAPACITACIONES
			sql.query("SELECT * FROM prevencion.vw_training WHERE fk_entidad_id = :entityId AND capacitacion_estado NOT IN ('ANULADA') ORDER BY capacitacion_codigo DESC", filterParams).then(function (trainings) {

				db.setEmpty(res,'HISTORIAL DE CAPACITACIONES DE UNA EMPRESA',true,{trainingList:trainings,standsList:stands,simulationsList:simulations});
		
			}).catch(function (err) {return next(err);});
			
		}).catch(function (err) {return next(err);});
		
    }).catch(function (err) {return next(err);});
};