'use strict';
const db = require('../config/db.config.js');
const sql = db.sequelize;

// Personal en funciones
exports.findAllUnits = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM logistica.vw_unidades", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE UNIDADES');
    }).catch(function (err) {return next(err);});
};