'use strict';
const db = require('../../models');
const employeeModel = db.permits.employees;
const brigadistModel = db.prevention.brigadists;
const person = db.resources.persons;

module.exports = {
	
	// ELIMINAR LISTADO DE EMPLEADOS POR ID DE PLAN
	updateEntity(req, res){

		// TRANSACCION
		db.sequelize.transaction(async (t) => {

			// ELIMINAR ID DE REGISTROS
			let modelTemp = {
				person: db.cloneObjArray(req.body.person,['persona_tipo_doc','persona_doc_identidad','persona_apellidos','persona_nombres'])
			};

			// CREAR RESPONSABLE
			await person.update(
				modelTemp.person,
				{ where: { persona_id: req.body.person.persona_id } }
			).then(async (data) => { return data; });

			// CREAR BRIGADA
			await employeeModel.update(
				req.body,
				{ where: { empleado_id: req.body.empleado_id } }
			).then(async (data) => { return data; });
			
		}).then(result => {
			db.setEmpty(res,'¡Datos actualizados correctamente!',true,result); 
		}).catch(err => {
			db.setEmpty(res,'¡Error en el proceso!',false,err); 
		});
		
	},
	
	// ELIMINAR BRIGADA
	deleteEntity(req, res){

		employeeModel.findByPk(req.params.employeeId).then(employee => {
			
			brigadistModel.destroy({
				where: { fk_empleado_id: employee.empleado_id }
			}).then(result => {

				employee.destroy().then(result => {
					db.setEmpty(res,'¡Registro eliminado correctamente!');
				});

			});

		}).then(function(){
			
		}).catch(function(err){throw err;});

	},

	// ELIMINAR LISTADO DE EMPLEADOS POR ID DE PLAN
	deleteByLocal(req, res){
		// CONDICIONAL
		let strWhr = { fk_local_id: req.params.localId };

		employeeModel.findAll({
			where: strWhr,
			attributes:['empleado_id']
		}).then(toBeDeleted => {
			
			brigadistModel.destroy({
				where: {
					fk_empleado_id: { $in:toBeDeleted.map(function(d){ return d.empleado_id }) }
				}
			}).then(result => {

				employeeModel.destroy({
					where: strWhr
				}).then(result => {
					db.setEmpty(res,`Has the Max been deleted? 1 means yes, 0 means no: ${result}`);
				});

			});

		}).then(function(){
			
		}).catch(function(dbErr){throw err;});

	},

	// LISTAR EMPLEADOS POR ID DE ESTABLECIMIENTO
	findByLocal(req, res){
		// CONDICIONAL
		let strWhr = { fk_local_id: req.body.localId };
		// CONSUTAR SI EXISTE EL REGISTRO
		employeeModel.count({
			where: strWhr
		}).then(c => {
			// VALIDAR CONSULTA
			if( c > 0 ){
				employeeModel.findAll({
					where: strWhr,
					include:[
						{ 
							model: person, 
							as: 'person'
						}
					],
					order: [
						[ { model: person, as: 'person' }, 'persona_apellidos', 'ASC']
					]
				}).then(data => {
					
					// RETORNAR MODELO
					res.status(200).json({
						estado: true,
						mensaje: 'EMPLEADOS DE LOCAL',
						data: data
					});

				}).catch(err => { res.status(200).json({mensaje: "error", estado: false, details: err}); });

			}else{
				db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => employees->findByLocal');
			}
		});
	}

};