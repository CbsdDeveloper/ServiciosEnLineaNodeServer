const db = require('../../config/db.config.js');
const employeeModel = db.employees;
const person = db.persons;
// VARIABLES GLOBALES
var strWhr;

// BUSCAR LOCAL POR ID
exports.findByLocal = (req, res) => {
	// CONDICIONAL
	strWhr = { fk_local_id: req.body.localId };
	// CONSUTAR SI EXISTE EL REGISTRO
	employeeModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			employeeModel.findAll({
				include:[
					{ 
						model: person, 
						as: 'person', 
						required: false
					}
				],
				where: strWhr
			}).then(data => {
				// RETORNAR MODELO
				res.status(200).json({
					estado: true,
					mensaje: 'EMPLEADOS DE LOCAL',
					data: data
				});
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => employees->findByLocal');
		}
	});
};