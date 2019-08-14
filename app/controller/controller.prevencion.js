'use strict';
const db = require('../config/db.config.js');
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

// BUSCAR INSPECCIONES POR ID DE LOCAL
exports.inspectionsByLocal = (req, res, next) => {
    var filterParams = { 
		replacements: req.body, 
		type: sql.QueryTypes.SELECT
	};
	sql.query("SELECT * FROM prevencion.vw_inspecciones WHERE local_id = :localId", filterParams).then(function (data) {
        db.setJSON(res,data,'INSPECCIONES POR ID DE LOCAL');
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