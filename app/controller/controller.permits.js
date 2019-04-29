'use strict';
const db = require('../config/db.config.js');
const sql = db.sequelize;

// LISTADO CIIU POR ACTIVIDAD ECONÓMICA
exports.findCiiuByActivity = (req, res) => {
	var filterParams = { 
		replacements: {
			fkParent: req.body.fkParent,
			filter: '%' + ((req.body.filter)?req.body.filter:'') + '%'
		}, 
		type: sql.QueryTypes.SELECT
	};
	sql.query("SELECT fk_actividad_id actividad_id,fk_tasa_id tasa_id,ciiu_id,ciiu_nombre,ciiu_codigo FROM permisos.vw_ciiu WHERE (fk_actividad_id = :fkParent) AND (LOWER(sinacentos(ciiu_nombre)) LIKE LOWER(sinacentos(:filter)) OR LOWER(sinacentos(ciiu_codigo)) LIKE LOWER(sinacentos(:filter)))", filterParams).then(function (data) {
        db.setJSON(res,data,'LISTADO CIIU SEGUN ACTIVIDAD ECONOMICA');
    }).catch(function (err) {return next(err);});
};

// BUSCAR ENTIDAD POR RUC
exports.findEntityByRUC = (req, res) => {
	var filterParams = { 
		replacements: req.body, 
		type: sql.QueryTypes.SELECT
	};
	sql.query("SELECT * FROM permisos.vw_entidades WHERE UPPER(entidad_ruc) = UPPER(:ruc)", filterParams).then(function (data) {
        db.setJSON(res,data,'INFORMACIÓN DE ENTIDAD POR RUC');
    }).catch(function (err) {return next(err);});
};

// BUSCAR PERMISOS POR ID DE LOCAL
exports.findPermitsByLocal = (req, res) => {
	var filterParams = { 
		replacements: req.body, 
		type: sql.QueryTypes.SELECT
	};
	sql.query("SELECT * FROM permisos.vw_permisos WHERE local_id = :localId", filterParams).then(function (data) {
        db.setJSON(res,data,'BUSCAR PERMISOS POR ID DE LOCAL');
    }).catch(function (err) {return next(err);});
};
