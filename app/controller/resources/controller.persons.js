const db = require('../../config/db.config.js');
const Model = db.persons;

// LISTAR TODOS LOS REGISTROS
exports.findAll = (req, res) => {
	Model.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PERSONAS');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// ENCONTRAR REGISTRO POR ID
exports.findById = (req, res) => {	
	Model.findById(req.body.personId).then(data => {
		db.setJSON(res,data,'PERSONA POR ID');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// ENCONTRAR REGISTRO POR CEDULA
exports.findByCC = (req, res) => {
	Model.findOne({
		where: {persona_doc_identidad: req.body.identityCard}
	}).then(data => {
		res.status(200).json({
			estado: true,
			mensaje: 'PERSONA POR CC',
			data: data
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};