const db = require('../../config/db.config.js');
const Model = db.persons;

// FETCH All Customers
exports.findAll = (req, res) => {
	Model.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PERSONAS');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// Find a Customer by Id
exports.findById = (req, res) => {	
	Model.findById(req.params.id).then(data => {
		db.setJSON(res,data,'PERSONA POR ID');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// Find a Customer by Id
exports.findByCC = (req, res) => {
	Model.findOne({
		where: {persona_doc_identidad: req.body.cc}
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