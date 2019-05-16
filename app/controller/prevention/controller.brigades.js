const db = require('../../config/db.config.js');
const brigadeModel = db.brigades;

// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.insertEntity = (req, res) => {
    // CONDICIONALES DE BUSQUEDA
    var strWhr = {
		fk_local_id: req.body.fk_local_id,
		brigada_nombre: req.body.brigada_nombre
	};
	// ELIMINAR ID DE REGISTRO
	model = db.cloneObj(req.body,'brigada_id');
	// CREAR PUESTO
	brigadeModel.findOrCreate({
		where: strWhr,
		defaults: model
	}).then(([brigade, created]) => {
		// CREAR REGISTROS
		if(created){
			// RETORNAR LISTADO
			res.status(200).json({
				estado: true,
				mensaje: '¡Registro guardado con éxito!',
				data: brigade
			});
		}else{
			brigadeModel.update(
				model,
				{ where: { brigada_id: req.body.brigada_id } }
			).then(data => {
				// RETORNAR LISTADO
				res.status(200).json({
					estado: true,
					mensaje: '¡Registro actualizado con éxito!',
					data: data
				});
			});
		}
	  
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	
};

// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.findByLocal = (req, res) => {
    // CONDICIONALES DE BUSQUEDA
    var strWhr = { fk_local_id: req.body.localId}
	// CONSULTAR REGISTROS
	brigadeModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			brigadeModel.findAll({
				where: strWhr,
				order: [
					['brigada_nombre', 'ASC']
				]
			}).then(data => {
				// RETORNAR LISTADO
				res.status(200).json({
					estado: true,
					mensaje: 'BRIGADES DE UN LOCAL',
					data: data
				});
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => brigadeModel->findByLocal');
		}
	});
};