const db = require('../config/db.config.js');
const sql = db.sequelize;

// FETCH All Customers
exports.findAll = (req, res) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM admin.vw_usuarios", replacements).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE USUARIOS',
            length: data.length,
            data: data
        });
    }).catch(function (err) {return next(err);});
};

// FETCH All Customers
exports.findById = (req, res, next) => {
    const replacements = { replacements: req.params, type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM admin.vw_usuarios WHERE usuario_login = :usuario", replacements).then(function (data) {
        res.json({
            status: (data.length>0)?true:false,
            message: 'USUARIOS BY ID',
            params: req.params,
            data: data
        });
    }).catch(function (err) {return next(err);});
};