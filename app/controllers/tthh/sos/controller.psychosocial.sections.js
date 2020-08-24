'use strict';
const db = require('../../../models');
const psychosocialsectionsModel = db.tthh.psychosocialformsSections;
const psychosocialformsModel = db.tthh.psychosocialforms;


module.exports ={

	// LISTADO DE FORMULARIOS
	findAll(req, res){
		psychosocialsectionsModel.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE PUESTOS DE TRABAJO');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// DETALLE DE FORMULARIOS
	findById(req, res){
		psychosocialsectionsModel.findByPk(req.body.entityId,{
			include: [
				{ model: psychosocialformsModel, as: 'form' }
			]
		}).then(data => {
			db.setEmpty(res,'INFORMACION DE ENTIDAD - SECCION DE FORMULARIO > ' + data.formulario_nombre,true,data);
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}

}