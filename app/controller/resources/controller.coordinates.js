const db = require('../../config/db.config.js');
const coordinateModel = db.coordinates;

// ENCONTRAR REGISTRO POR ID
exports.findByEntity = (req, res) => {	
	// LISTA DE RETORNO
	var strWhr = { coordenada_entidad_id: req.body.entityId, coordenada_entidad: req.body.entity };
	// CONSULTAR REGISTROS
	coordinateModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			coordinateModel.findOne({
				where: strWhr
			}).then(data => {
				// RETORNAR LISTADO
				res.status(200).json({
					estado: true,
					mensaje: 'COORDENADAS DE UNA ENTIDAD',
					data: data
				});
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			res.status(200).json({
				estado: false,
				mensaje: 'NO SE HA ENCONTRADO EL REGISTRO => coordinateModel->findByEntity'
			});
		}
	});
};