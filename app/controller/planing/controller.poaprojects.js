'use strict';
const db = require('../../config/db.config.js');
const programModel = db.programspoa;
const projectModel = db.poaprojects;

// FETCH All Customers
exports.findAll = (req, res) => {
	projectModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PROYECTOS DEL POA');
	}).catch(err => {res.status(500).json({msg: "error", details: err});});
};

// FETCH All Customers
exports.findByPoa = (req, res) => {
	// CONDICIONAL
	let strWhr = { fk_poa_id: req.body.poaId };
	// CONSUTAR SI EXISTE EL REGISTRO
	projectModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			projectModel.findAll({
				include:[
					{ 
						model: programModel, 
						as: 'program'
					}
				],
				where: strWhr,
				order: [
					[ { model: programModel, as: 'program' }, 'programa_nombre', 'ASC']
				]
			}).then(data => {
				// RETORNAR MODELO
				res.status(200).json({
					estado: true,
					mensaje: 'PROYECTOS POR POA',
					data: data
				});
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			db.setEmpty(res,'NO SE HA ENCONTRADO PROYECTOS ASOCIADOS => poaprojects->findByPoa');
		}
	});
};
