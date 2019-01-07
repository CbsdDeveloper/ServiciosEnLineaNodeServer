const db = require('../config/db.config.js');
const sql = db.sequelize;

// Listado de paises
exports.findCommercialActivities = (req, res) => {
    sql.query("SELECT * FROM permisos.tb_actividades", { type: sql.QueryTypes.SELECT }).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE ACTIVIDADES COMERCIALES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Listado de provincias
exports.findCiiuByActivity = (req, res) => {
	var filterParams = { 
		replacements: {
			fkParent: req.body.fkParent,
			filter: '%' + ((req.body.filter)?req.body.filter:'') + '%'
		}, 
		type: sql.QueryTypes.SELECT
	};
	sql.query("SELECT fk_actividad_id actividad_id,fk_tasa_id tasa_id,ciiu_id,ciiu_nombre,ciiu_codigo FROM permisos.vw_ciiu WHERE (fk_actividad_id = :fkParent) AND (LOWER(sinacentos(ciiu_nombre)) LIKE LOWER(sinacentos(:filter)) OR LOWER(sinacentos(ciiu_codigo)) LIKE LOWER(sinacentos(:filter)))", filterParams).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO CIIU SEGUN ACTIVIDAD ECONOMICA',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};
