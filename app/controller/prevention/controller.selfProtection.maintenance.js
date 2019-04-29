const db = require('../../config/db.config.js');
const resourceModel = db.resources;
const maintenanceModel = db.selfProtectionMaintenance;

// ENCONTRAR REGISTRO POR ID
exports.findSelfProtectionMaintenanceByPlan = (req, res) => {
	// MODELO DE RETORNO
	resources = {};
	model = {};
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
			where: { fk_plan_id: req.body.planId }
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