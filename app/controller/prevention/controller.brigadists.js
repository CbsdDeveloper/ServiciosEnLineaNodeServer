const db = require('../../config/db.config.js');
const brigadistModel = db.brigadists;
const brigadeModel = db.brigades;
const employeeModel = db.employees;
const personModel = db.persons;

// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.insertBrigadists = (req, res) => {
	
	// TRANSACCION
	db.sequelize.transaction( async t => {

		// EMPLEADOS
		await brigadistModel.destroy(
			{ where: { fk_brigada_id: req.body.brigadeId } }, t 
		);
		
		await req.body.selected.forEach(async v => {

			await brigadistModel.create({ fk_empleado_id: v, fk_brigada_id: req.body.brigadeId }, { t });

		});
		
	}).then(result => {
		db.setEmpty(res,'¡Datos actualizados correctamente!',true,result); 
	}).catch(err => {
		db.setEmpty(res,'¡Error en el proceso!',false,err); 
	});
		
	
};


// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.findByBrigade = (req, res) => {
    // CONDICIONALES DE BUSQUEDA
    var strWhr = { fk_local_id: req.body.localId }
	var brigadistsList = [];
	// EMPLEADOS
	employeeModel.findAll({
		where: strWhr,
		include:[
			{ 
				model: personModel,
				as: 'person'
			}
		]
	}).then(employees => {

		// BRIGADISTAS
		brigadistModel.findAll({
			where: { fk_brigada_id: req.body.brigadeId }
		}).then(brigadists => {

			// LISTADO DE BRIGADISTAS
			brigadists.forEach(v => { brigadistsList.push(v.fk_empleado_id); });

			// RETORNAR LISTADO
			res.status(200).json({
				estado: true,
				mensaje: 'BRIGADISTAS DE BRIGADAS',
				data: {
					brigadistsList: brigadistsList,
					employeesList: employees
				}
			});
			
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });

	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		
	
};