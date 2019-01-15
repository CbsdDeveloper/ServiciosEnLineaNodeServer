const db = require('../../config/db.config.js');
const Model = db.entities;

// FETCH All Customers
exports.findAll = (req, res) => {
	Model.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE ENTIDADES');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// Find a Customer by Id
exports.findById = (req, res) => {	
	Model.findById(req.params.id).then(data => {
		db.setJSON(res,data,'ENTIDAD POR ID');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// Find a Customer by Id
exports.findByRUC = (req, res) => {
	Model.findOne({
		where: {entidad_ruc: req.body.ruc},
		include: [
			{ model: db.persons, as: 'person' }
		]
	}).then(data => {
		res.status(200).json({
			estado: true,
			mensaje: 'ENTIDAD POR RUC',
			data: data
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};