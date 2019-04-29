const db = require('../../config/db.config.js');
const resourceModel = db.resources;
const factorModel = db.selfProtectionFactors;

// ENCONTRAR REGISTRO POR ID
exports.findSelfProtectionFactorsByPlan = (req, res) => {
	// MODELO DE RETORNO
	resources = {};
	model = {};
	// CONSULTAR REGISTROS
	resourceModel.findAll({
		where: { recurso_clasificacion_prevencion: ['FACTORES DE RIESGO Y PELIGRO'] },
		order: [
            ['recurso_id']
        ]
	}).then(resourcesList => {
		// CLASIFICACION DE RECURSOS
		resourcesList.forEach((v, k) => {
			// CREAR MODELO SI NO EXISTE
			if(!resources[v.recurso_clasificacion]) resources[v.recurso_clasificacion]={};
			// INSERTAR RECURSO EN MODELO
			resources[v.recurso_clasificacion][v.recurso_id] = v;
		});

		// CONSULTAR RECURSOS DE UN PLAN
		factorModel.findAll({
			where: { fk_plan_id: req.body.planId }
		}).then(factorsList => {

			// CLASIFICACION DE RECURSOS
			factorsList.forEach((v, k) => {
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