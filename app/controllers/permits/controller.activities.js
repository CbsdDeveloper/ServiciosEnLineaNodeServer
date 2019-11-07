'use strict';
const db = require('../../models');
const activityModel = db.activities;

// LISTADO DE ACTIVIDADES
exports.findCommercialActivities = (req, res) => {
	activityModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE ACTIVIDADES');
	}).catch(err => {
		res.status(500).json({msg: "error", details: err});
	});
};