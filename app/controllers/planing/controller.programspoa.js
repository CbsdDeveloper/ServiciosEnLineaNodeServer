'use strict';
const db = require('../../models');
const programModel = db.planing.programspoa;

// FETCH All Customers
exports.findAll = (req, res) => {
	programModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PROGRAMAS PARA POA');
	}).catch(err => {res.status(500).json({msg: "error", details: err});});
};
