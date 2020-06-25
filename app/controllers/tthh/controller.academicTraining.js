'use strict';
const db = require('../../models');
const academicTrainingModel = db.tthh.academicTraining;
const personModel = db.resources.persons;

// FETCH All Customers
exports.findAll = (req, res) => {
	academicTrainingModel.findAll().then(data => {
		db.setJSON(res,data,'LISTADO DE ENTIDADES');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// Find a Customer by Id
exports.findById = (req, res) => {
	academicTrainingModel.findById(req.params.id).then(data => {
		db.setJSON(res,data,'ENTIDAD POR ID');
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

// Find a Customer by Id
exports.findByPerson = (req, res) => {
	personModel.findAndCountAll({
		where: { persona_doc_identidad: req.body.academicTraining },
		limit: 1
	}).then(result => {
		// VALIDAR SI EXISTE REGISTRO DE PERSONA
		if(result.count<1) db.setJSON(res,{},"NO SE HA ENCONTRADO NINGUN REGISTRO, COMPLETE MANUALMENTE EL FORMULARIO.");
		// CONSULTAR TITULO
		academicTrainingModel.findAndCountAll({
			include:[
				{ model: personModel, as: 'person' }
			],
			where: { 
				formacion_estado: 'FINALIZADO', 
				fk_persona_id: result.rows[0].persona_id 
			},
			order: [ 
				[ 'formacion_fregistro','DESC' ]
			],
			limit: 1
		}).then(data => {
			var aux = (data.count<1)?{person:result.rows[0]}:data.rows[0];
			res.status(200).json({
				estado: true,
				mensaje: "PROFESIONAL POR CC",
				data: aux
			});

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });

	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};

// BUSCAR POR CEDULA
exports.findByIdentificationPerson = (req, res) => {
	// SENTENCIA WEHER
	let strWhr = { persona_doc_identidad: req.body.academicTraining };
	// CONSUTAR SI EXISTE EL REGISTRO
	personModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){

			// OBTENER REGISTRO DE PERSONA INCLUYENDO EL TITULO
			personModel.findOne({
				include:[
					{ 
						model: academicTrainingModel, 
						as: 'training', 
						required: false, 
						where: { formacion_estado: 'FINALIZADO', formacion_nivel: [ 'GRADO','POSTGRADO','DOCTORADO' ] },
						order: [
							[ 'formacion_fregistro','DESC' ]
						]
					}
				],
				where: strWhr
			}).then(person => {
				
				// RETORNAR MODELO
				res.status(200).json({
					estado: true,
					mensaje: 'CONSULTAR TITULOS POR CEDULA',
					data: person
				});

			}).catch(err => { res.status(500).json({msg: "error", details: err}); });

		} else db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => acaedmicTraining->findByIdentificationPerson',false);

	}).catch(err => { res.status(500).json({msg: "error", details: err}); });

};