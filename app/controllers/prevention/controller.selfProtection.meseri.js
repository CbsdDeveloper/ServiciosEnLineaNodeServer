'use strict';
const db = require('../../models');
const resourceModel = db.resources;
const meseriModel = db.selfProtectionMeseri;

// ENCONTRAR REGISTRO POR ID
exports.findSelfProtectionMeseriByPlan = (req, res) => {
	// MODELO DE RETORNO
	let resources = {};
	let model = {};
	let temp = {};
	// CONSULTAR REGISTROS
	resourceModel.findAll({
		where: { recurso_clasificacion_prevencion: ['EVALUACION DE FACTORES DE RIESGOS DETECTADOS'] },
		order: [
            ['recurso_id']
        ]
	}).then(resourcesList => {
		// CLASIFICACION DE RECURSOS
		resourcesList.forEach((v, k) => {
			// CREAR MODELO SI NO EXISTE
			if(!resources[v.recurso_tipo_formulario]) resources[v.recurso_tipo_formulario]={};
			// CREAR MODELO SI NO EXISTE
			if(!resources[v.recurso_tipo_formulario][v.recurso_clasificacion]) resources[v.recurso_tipo_formulario][v.recurso_clasificacion]={};
			// PARSE MODEL
			v.recurso_lista_valores = JSON.parse(v.recurso_lista_valores);
			// INSERTAR RECURSO EN MODELO
			resources[v.recurso_tipo_formulario][v.recurso_clasificacion][v.recurso_id] = v;
			// CLASIFICACION TEMPORAL
			temp[v.recurso_id] = [v.recurso_tipo_formulario];
		});

		// CONSULTAR RECURSOS DE UN PLAN
		meseriModel.findAll({
			where: { fk_plan_id: req.body.planId }
		}).then(preventionList => {

			// CLASIFICACION DE RECURSOS
			preventionList.forEach((v, k) => {
				// CREAR MODELO SI NO EXISTE
				if(!model[temp[[v.fk_recurso_id]]]) model[temp[[v.fk_recurso_id]]]={};
				// PARSE MODEL - COEFICIENTE MESERI
				v.meseri_coeficiente = JSON.parse(v.meseri_coeficiente);
				// INSERTAR RECURSO EN MODELO
				model[temp[[v.fk_recurso_id]]][v.fk_recurso_id] = v;
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