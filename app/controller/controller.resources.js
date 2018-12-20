const db = require('../config/db.config.js');
const sql = db.sequelize;

// Códigos institucionales
exports.findAllCodes = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM resources.vw_codigosinstitucionales", replacements).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE CÓDIGOS INSTITUCIONALES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Códigos institucionales por evento
exports.findCodesByType = (req, res) => {
    const type = { tracking:'codigo_flota', part:'codigo_parte' };
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM resources.vw_codigosinstitucionales WHERE " + type[req.params.option] + "='SI' ORDER BY codigo_clave", replacements).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE CÓDIGOS INSTITUCIONALES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};