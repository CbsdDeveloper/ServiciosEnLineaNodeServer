'use strict';
const db = require('../../config/db.config.js');
const programModel = db.programspoa;

// FETCH All Customers
exports.findAll = (req, res) => {
	programModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PROGRAMAS PARA POA');
	}).catch(err => {res.status(500).json({msg: "error", details: err});});
};
