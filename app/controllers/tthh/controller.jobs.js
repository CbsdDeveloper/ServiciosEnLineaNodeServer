'use strict';
const db = require('../../models');
const jobModel = db.jobs;
const leadershipModel = db.leaderships;

// LISTADO DE PUESTOS DE TRABAJO
exports.findAll = (req, res) => {
	jobModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PUESTOS DE TRABAJO');
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};

// LISTADO DE PUESTOS DE TRABAJO CLASIFICADOS POR DIRECCION
exports.findAllStaffByLeadership = (req, res) => {
	// MODELO DE CONSULTA
	let model={
		leaderships:[],
		jobs:{}
	};
	// CONSULTAR REGISTROS
	jobModel.findAll({
		where: {
			puesto_estado: 'ACTIVO'
		},
		include:[
			{ 
				model: leadershipModel, 
				as: 'leadership'
			}
		],
		order: [
			['leadership','direccion_nombre', 'ASC'],
			['puesto_nombre', 'ASC']
		]
	}).then(data => {

		// CLASIFICAR REGISTROS POR DIRECCION
		data.forEach((v, k) => {
			// VALIDAR SI EXISTE DIRECCION
			if(!model.jobs[v.leadership.direccion_id]){
				model.leaderships.push(v.leadership);
				model.jobs[v.leadership.direccion_id]=[];
			}
			// REGISTRAR MODELO
			model.jobs[v.leadership.direccion_id].push(v);
		});
		// RETORNAR CONSULTA
		db.setJSON(res,model,'LISTADO DE PUESTOS DE TRABAJO POR DIRECCIONES');

	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};