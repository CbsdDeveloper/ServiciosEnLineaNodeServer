'use strict';
const db = require('../../config/db.config.js');
const Model = db.profiles;

// FETCH All Customers
exports.findAll = (req, res) => {
	Model.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE ACTIVIDADES COMERCIALES');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// Find a Customer by Id
exports.findById = (req, res) => {	
	Model.findById(req.params.id).then(data => {
		db.setJSON(res,data,'PERFIL POR ID');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};