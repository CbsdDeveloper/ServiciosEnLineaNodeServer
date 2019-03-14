'use strict';
const db = require('../config/db.config.js');
const sql = db.sequelize;

// CONSULTA TWILIO
exports.requestTwilio = (req, res) => {
	res.status(200).json({
        estado: true,
        mensaje: 'serviceName',
        data: req.body
    });
};