const db = require('../config/db.config.js');
const Model = db.stations;

// FETCH All Customers
exports.findAll = (req, res) => {
	Model.findAll().then(data => {
		res.status(200).json({
            status: (data.length>0)?true:false,
            message: 'LISTADO DE ESTACIONES',
            length: data.length,
            data: data
        });
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// Find a Customer by Id
exports.findById = (req, res) => {	
	Model.findById(req.params.id).then(data => {
		res.json({
            status: (data.length>0)?true:false,
            message: 'ESTACION POR ID',
            params: req.params,
            data: data
        });
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};