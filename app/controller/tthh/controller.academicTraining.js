const db = require('../../config/db.config.js');
const Model = db.academicTraining;
const Person = db.persons;

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
exports.findByPerson = (req, res) => {
	Person.findAndCountAll({
		where: { persona_doc_identidad: req.body.academicTraining },
		limit: 1
	}).then(result => {
		// VALIDAR SI EXISTE REGISTRO DE PERSONA
		if(result.count<1) db.setJSON(res,{},"NO SE HA ENCONTRADO NINGUN REGISTRO, COMPLETE MANUALMENTE EL FORMULARIO.");
		// CONSULTAR TITULO
		Model.findAndCountAll({
			include:[
				{ model: Person, as: 'person' }
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
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};