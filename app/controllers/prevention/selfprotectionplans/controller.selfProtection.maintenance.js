'use strict';
const db = require('../../../models');
const resourceModel = db.resources.resources;
const entityModel = db.permits.entities;
const personModel = db.resources.persons;
const maintenanceModel = db.prevention.selfProtectionMaintenance;

// ENCONTRAR REGISTRO POR ID
exports.findSelfProtectionMaintenanceByPlan = (req, res) => {
	// MODELO DE RETORNO
	let resources = {};
	let model = {};
	// CONSULTAR REGISTROS
	resourceModel.findAll({
		where: { recurso_clasificacion_prevencion: ['MANTENIMIENTO'] },
		order: [
            ['recurso_id']
        ]
	}).then(resourcesList => {
		// CLASIFICACION DE RECURSOS
		resourcesList.forEach((v, k) => {
			// INSERTAR RECURSO EN MODELO
			resources[v.recurso_id] = v;
		});

		// CONSULTAR RECURSOS DE UN PLAN
		maintenanceModel.findAll({
			where: { fk_plan_id: req.body.planId },
			include: [
				{ 
					model: entityModel, as: 'professional', 
					include: [
						{ model: personModel, as: 'person' }
					]
				}
			]
		}).then(preventionList => {

			// CLASIFICACION DE RECURSOS
			preventionList.forEach((v, k) => {
				model[v.fk_recurso_id] = v;
			});
			
			// RETORNAR LISTADO
			res.status(200).json({
				estado: true,
				mensaje: 'RECURSOS PARA PLANES DE AUTOPROTECCION',
				data: {
					resources: resources,
					model: model
				}
			});

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });	
		
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });	
};

// ENCONTRAR REGISTRO POR ID
exports.findSelfProtectionMaintenanceApplyByPlan = (req, res) => {
	
	// CONSULTAR RECURSOS DE UN PLAN
	maintenanceModel.findAll({
		where: { 
			fk_plan_id: req.body.planId,
			mantenimiento_aplicacion: 'SI APLICA'
		},
		include: [
			{ 
				model: resourceModel, as: 'resource'
			}
		]
	}).then(preventionList => {
		// RETORNAR LISTADO
		res.status(200).json({
			estado: true,
			mensaje: 'ANEXOS DE MANTENIMIENTO PARA PLANES DE AUTOPROTECCION',
			data: preventionList
		});
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		
};


