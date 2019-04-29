const db = require('../../config/db.config.js');
const resourceModel = db.resources;

// ENCONTRAR REGISTRO POR ID
exports.findResourcesFactorsForPlans = (req, res) => {
	// MODELO DE RETORNO
	model = {};
	// CONSULTAR REGISTROS
	resourceModel.findAll({
		where: { recurso_clasificacion: ['FACTORES INTERNOS','POSIBLE SOLUCIÓN A RIESGOS Y PELIGROS INTERNOS','FACTORES EXTERNOS','POSIBLE SOLUCIÓN A RIESGOS Y PELIGROS EXTERNOS'] }
	}).then(data => {
		// CLASIFICACION DE RECURSOS
		data.forEach((v, k) => {
			// CREAR MODELO SI NO EXISTE
			if(!model[v.recurso_clasificacion]) model[v.recurso_clasificacion]={};
			// INSERTAR RECURSO EN MODELO
			model[v.recurso_clasificacion][v.recurso_id] = v;
		});
		// RETORNAR LISTADO
		res.status(200).json({
			estado: true,
			mensaje: 'RECURSOS PARA PLANES DE AUTOPROTECCION',
			data: model
		});
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });	
};

// ENCONTRAR REGISTRO POR ID
exports.findResourcesPreventionForPlans = (req, res) => {
	// MODELO DE RETORNO
	model = {};
	// CONSULTAR REGISTROS
	resourceModel.findAll({
		where: { recurso_clasificacion: ['PREVENCIÓN Y CONTROL DE RIESGOS'] }
	}).then(data => {
		// CLASIFICACION DE RECURSOS
		data.forEach((v, k) => {
			// CREAR MODELO SI NO EXISTE
			if(!model[v.recurso_clasificacion]) model[v.recurso_clasificacion]={};
			// INSERTAR RECURSO EN MODELO
			model[v.recurso_clasificacion][v.recurso_id] = v;
		});
		// RETORNAR LISTADO
		res.status(200).json({
			estado: true,
			mensaje: 'RECURSOS PARA PLANES DE AUTOPROTECCION',
			data: model
		});
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });	
};