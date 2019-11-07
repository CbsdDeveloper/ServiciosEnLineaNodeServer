'use strict';
const db = require('../models');
const sql = db.sequelize;

// CONSULTA TWILIO
exports.requestTwilio = (req, res) => {
	res.status(200).json({
        estado: true,
        mensaje: 'serviceName',
        data: req.body
    });
};

// Operadores
exports.findInspectorsPrevention = (req, res, next) => {
    const replacements = { type: sql.QueryTypes.SELECT };
    sql.query("SELECT * FROM admin.vw_informacion_usuarios WHERE perfil_id IN (6,5) AND usuario_estado='ACTIVO'", replacements).then(function (data) {
        db.setJSON(res,data,'LISTADO DE PROFESIONALES DE PREVENCION E INGENIERIA DEL FUEGO');
    }).catch(function (err) {return next(err);});
};