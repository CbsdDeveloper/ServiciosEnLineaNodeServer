const db = require('../../config/db.config.js');
const geojsonModel = db.geojson;

// ENCONTRAR REGISTRO POR ID
exports.findByEntity = (req, res) => {	
	// LISTA DE RETORNO
	var list = [];
	// CONSULTAR REGISTROS
	geojsonModel.findAll({
		where: { mapa_entidad_id: req.body.entityId, mapa_entidad: req.body.entity }
	}).then(data => {
		// INSERTAR COORDENADAS EN LISTADO
		data.forEach((v, k) => {
			list.push(JSON.parse(v.mapa_geojson)); 
		});
		// RETORNAR LISTADO
		res.status(200).json({
			estado: true,
			mensaje: 'COORDENADAS DE UNA ENTIDAD',
			data: list
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};