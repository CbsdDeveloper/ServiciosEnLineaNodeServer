const db = require('../../config/db.config.js');
const arrearModel = db.arrears;

// FETCH All Customers
exports.insertEntity = (req, res) => {
	// arrearModel.create(req.body)
	arrearModel.create(req.body)
	.then(arrear => {
		res.status(200).json({
			estado: true,
			data: arrear.get(),
			mensaje: '¡Datos ingresado correctamente!'
		});


	}).catch(err => { res.status(500).json({msg: "error", details: err}); });

};