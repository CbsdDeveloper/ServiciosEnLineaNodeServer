const db = require('../../config/db.config.js');
const Model = db.jobs;

// FETCH All Customers
exports.findAll = (req, res) => {
	Model.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE PUESTOS DE TRABAJO');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};