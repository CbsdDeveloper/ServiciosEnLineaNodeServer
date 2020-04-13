'use strict';
const db = require('../../../models');
const psychosocialsectionsModel = db.psychosocialformsSections;
const psychosocialformsModel = db.psychosocialforms;

// LISTADO DE FORMULARIOS
exports.findAll = (req, res) => {
	psychosocialsectionsModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PUESTOS DE TRABAJO');
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};

// DETALLE DE FORMULARIOS
exports.findById = (req, res) => {
	psychosocialsectionsModel.findByPk(req.body.entityId,{
		include: [
			{
			  model: psychosocialformsModel,
			  as: 'form'
			}
		]
	}).then(data => {
		db.setEmpty(res,'INFORMACION DE ENTIDAD - SECCION DE FORMULARIO > ' + data.formulario_nombre,true,data);
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};