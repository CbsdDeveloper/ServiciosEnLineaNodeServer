'use strict';
const db = require('../../../models');
const brigadistModel = db.prevention.brigadists;
const employeeModel = db.permits.employees;
const personModel = db.resources.persons;

module.exports = {
	
	// REGISTRAR BRIGADISTAS
	insertBrigadists(req, res){
		// TRANSACCION
		db.sequelize.transaction(async (t) => {
			// ELIMINAR LISTADO DE BRIGADISTAS
			await brigadistModel.destroy({ where: { fk_brigada_id: req.body.brigadeId } });
			// RECORRER LISTADO 
			await req.body.selected.forEach(async (v) => {
				// INGRESAR LISTADO DE EMPLEADOS
				await brigadistModel.create({ fk_empleado_id: v, fk_brigada_id: req.body.brigadeId });
			});
		}).then(result => {
			db.setEmpty(res,'¡Datos actualizados correctamente!',true,result); 
		}).catch(err => {
			db.setEmpty(res,'¡Error en el proceso!',false,err); 
		});
	},

	// LISTAR PERSONAL DE BRIGADAS
	findByBrigade(req, res){
		// CONDICIONALES DE BUSQUEDA
		var strWhr = { fk_local_id: req.body.localId }
		var brigadistsList = [];
		// EMPLEADOS
		employeeModel.findAll({
			where: strWhr,
			include:[
				{ model: personModel, as: 'person' }
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
					mensaje: 'PERSONAL DE BRIGADAS',
					data: {
						brigadistsList: brigadistsList,
						employeesList: employees
					}
				});
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}

};