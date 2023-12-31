'use strict';
const db = require('../../models');
const Model = db.admin.users;

// FETCH All Customers
exports.findAll = (req, res) => {
	Model.findAll({
		include: [
			{ model: db.admin.profiles, as: 'profile' },
			{ model: db.resources.persons, as: 'person' }
		]
	}).then(data => {
		db.setJSON(res,data,'LISTADO DE USUARIOS');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// Find a Customer by Id
exports.findById = (req, res) => {	
	Model.findById(req.params.id).then(data => {
		db.setJSON(res,data,'USUARIO POR ID');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};