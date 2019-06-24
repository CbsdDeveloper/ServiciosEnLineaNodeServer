'use strict';
const db = require('../../config/db.config.js');
const workdaysModel = db.workdays;

// FETCH All Customers
exports.findAll = (req, res) => {
	workdaysModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE JORNADAS DE TRABAJO');
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};