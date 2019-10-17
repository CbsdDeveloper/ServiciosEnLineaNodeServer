'use strict';
const db = require('../../config/db.config.js');
const contractingproceduresModel = db.contractingprocedures;

// FETCH All Customers
exports.findAll = (req, res) => {
	contractingproceduresModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PROCEDIMIENTOS DE CONTRATACIÓN');
	}).catch(err => {res.status(500).json({msg: "error", details: err});});
};

// REGISTRO POR ID
exports.findById = (req, res) => {


	

	contractingproceduresModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PROCEDIMIENTOS DE CONTRATACIÓN');
	}).catch(err => {res.status(500).json({msg: "error", details: err});});
};
