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