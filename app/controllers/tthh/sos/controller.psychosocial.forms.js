'use strict';
const db = require('../../../models');
const psychosocialformsModel = db.tthh.psychosocialforms;

module.exports ={

	// LISTADO DE FORMULARIOS
	findAll(req, res){
		psychosocialformsModel.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE FORMULARIOS');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// LISTADO DE FORMULARIOS ACTIVOS
	findAllActive(req, res){
		psychosocialformsModel.findAll({
			where: { formulario_estado:'ACTIVO' }
		}).then(data => {
			db.setJSON(res,data,'LISTADO DE FORMULARIOS');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// INFORMACION DE ENTIDAD
	findById(req, res){
		psychosocialformsModel.findByPk(req.body.entityId).then(data => {
			db.setEmpty(res,'INFORMACION DE ENTIDAD',true,data);
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}

}