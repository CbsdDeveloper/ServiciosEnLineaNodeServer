const db = require('../config/db.config.js');
const sql = db.sequelize;

// Personal en funciones
exports.findAllStaff = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_personal WHERE ppersonal_estado='EN FUNCIONES' ORDER BY personal_nombre", replacements).then(function (data) {
        res.status(200).json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE PERSONAL EN FUNCIONES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// Personal en funciones
exports.findAllDrivers = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM tthh.vw_conductores WHERE personal_estado='EN FUNCIONES' ORDER BY personal_nombre, licencia_categoria", replacements).then(function (data) {
        res.status(200).json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE CONDUCTORES',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};