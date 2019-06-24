'use strict';
const db = require('../../config/db.config.js');
const Model = db.stations;

// FETCH All Customers
exports.findAll = (req, res) => {
	Model.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE ESTACIONES');
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};

// Find a Customer by Id
exports.findById = (req, res) => {	
	Model.findById(req.params.id).then(data => {
		db.setJSON(res,data,'ESTACION POR ID');
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};