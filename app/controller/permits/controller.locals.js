const db = require('../../config/db.config.js');
const localModel = db.locals;
const SOS = db.persons;
const coordinates = db.coordinates;
// VARIABLES GLOBALES
var strWhr;

// BUSCAR LOCAL POR ID
exports.findById = (req, res) => {
	// CONDICIONAL
	strWhr = { local_id: req.body.localId };
	// CONSUTAR SI EXISTE EL REGISTRO
	localModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			localModel.findOne({
				include:[
					{ model: SOS, as: 'sos' },
					{ model: coordinates, as: 'coordinates', required: false, where: { coordenada_entidad: 'locales'}}
				],
				where: strWhr
			}).then(data => {
				// RETORNAR MODELO
				res.status(200).json({
					estado: true,
					mensaje: 'LOCALES POR ID',
					data: data
				});
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => local->findById');
		}
	});
};

// ACTUALIZAR REGISTROS
exports.updateEntity = (req, res) => {
	
	// CONDICIONAL
	strWhr = { persona_doc_identidad: req.body.sos.persona_doc_identidad };
	// CONSULTAR SI EXISTE EL REGISTRO
	SOS.findOrCreate({
		where: strWhr, 
		defaults: req.body.sos
	}).then(([user, created]) => {
		// VALIDAR SI SE HA CREADO EL REGISTRO Y ACTUALIZAR
		if( !created ){
			SOS.update(
				req.body.sos,
				{ where: strWhr }
			).then(() => {})
		}
		// ID DE REGISTRO PARA RELACION CON LOCAL
		req.body.fk_sos_id = user.persona_id;
		// ACTUALIZAR DATOS DE LOCAL
		localModel.update(
			req.body,
			{
				where: { local_id: req.body.local_id }
			}
		).then(data => {
			res.status(200).json({
				estado: true,
				mensaje: 'LOCALES POR ID'
			});
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	});

};
