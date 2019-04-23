const db = require('../../config/db.config.js');
const planModel = db.plans;

// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.findByLocalId = (req, res) => {
    // CONDICIONALES DE BUSQUEDA
    var strWhr = { fk_local_id: req.body.planLocalId}
	// CONSULTAR REGISTROS
	planModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			planModel.findAll({
				where: strWhr
			}).then(data => {
				// RETORNAR LISTADO
				res.status(200).json({
					estado: true,
					mensaje: 'PLANES DE UN LOCAL',
					data: data
				});
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => planModel->findByLocalId');
		}
	});
};

// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.findById = (req, res) => {
    // CONDICIONALES DE BUSQUEDA
    var strWhr = { plan_id: req.body.planId}
	// CONSULTAR REGISTROS
	planModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			planModel.findOne({
				where: strWhr
			}).then(data => {
				// RETORNAR LISTADO
				res.status(200).json({
					estado: true,
					mensaje: 'PLAN POR IR',
					data: data
				});
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => planModel->findById');
		}
	});
};