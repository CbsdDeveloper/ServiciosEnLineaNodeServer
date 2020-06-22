'use strict';
const db = require('../../../models');
const annexeModel = db.prevention.selfProtectionAnnexes;

// ENCONTRAR REGISTRO POR ID
exports.findSelfProtectionAnnexesByPlan = (req, res) => {

	// CONSULTAR RECURSOS DE UN PLAN
	annexeModel.findAll({
		where: { fk_plan_id: req.body.planId }
	}).then(data => {
		
		// RETORNAR LISTADO
		res.status(200).json({
			estado: true,
			mensaje: 'ANEXOS PARA PLANES DE AUTOPROTECCION',
			data: data
		});

	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	
};