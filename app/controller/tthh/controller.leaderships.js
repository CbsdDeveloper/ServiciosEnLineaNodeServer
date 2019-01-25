const db = require('../../config/db.config.js');
const Model = db.leaderships;

// FETCH All Customers
exports.findAll = (req, res) => {
	Model.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE DIRECCIONES');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};