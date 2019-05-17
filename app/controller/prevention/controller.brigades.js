const db = require('../../config/db.config.js');
const brigadeModel = db.brigades;
const personModel = db.persons;
const brigadistModel = db.brigadists;

// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.insertEntity = (req, res) => {
	
    // CONDICIONALES DE BUSQUEDA
    let strWhr = {
		fk_local_id: req.body.fk_local_id,
		brigada_nombre: req.body.brigada_nombre
	};
	// ELIMINAR ID DE REGISTRO
	let modelTemp = {
		brigade: db.cloneObj(req.body,'brigada_id'),
		responsable: db.cloneObjArray(req.body.responsable,['persona_tipo_doc','persona_doc_identidad','persona_apellidos','persona_nombres']),
		junior: null
	};
	
	// TRANSACCION
	db.sequelize.transaction( async t => {

		// CREAR RESPONSABLE
		responsable = await personModel.findOrCreate({
			where: { persona_doc_identidad: modelTemp.responsable.persona_doc_identidad },
			defaults: modelTemp.responsable
		}).then(async ([data, created]) => { return data; });
	
		// CREAR BRIGADA
		brigade = await brigadeModel.findOrCreate({
				where: strWhr, defaults: modelTemp.brigade
		}).then(async ([data, created]) => {
			if(created) await brigadeModel.update( data, { where: { brigada_id: req.body.brigada_id } } );
			return data;
		});

		// CREAR SUBALTERNO
		if(req.body.junior){
			// CREACION DE SUBALTERNO DE GUARDIA
			modelTemp.junior=db.cloneObjArray(req.body.junior,['persona_tipo_doc','persona_doc_identidad','persona_apellidos','persona_nombres']);
			junior = await personModel.findOrCreate({
				where: { persona_doc_identidad: modelTemp.junior.persona_doc_identidad },
				defaults: modelTemp.junior
			}).then(async ([data, created]) => { return data; });
			// SETTEAR SUBALTERNO
			brigade.setJunior(junior);
		}

		// SETTEAR RESPONSABLE
		brigade.setResponsable(responsable);

	}).then(result => {
		db.setEmpty(res,'¡Datos actualizados correctamente!',true,result); 
	}).catch(err => {
		db.setEmpty(res,'¡Error en el proceso!',false,err); 
	});
	
};

// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.findByLocal = (req, res) => {
    // CONDICIONALES DE BUSQUEDA
    var strWhr = { fk_local_id: req.body.localId}
	// CONSULTAR REGISTROS
	brigadeModel.count({
		where: strWhr
	}).then(c => {
		// VALIDAR CONSULTA
		if( c > 0 ){
			brigadeModel.findAll({
				where: strWhr,
				include: [
					{ 
						model: personModel,
						as: 'responsable'
					},
					{ 
						model: personModel,
						as: 'junior',
						require: false
					},
					{ 
						model: brigadistModel,
						as: 'brigadist',
						require: false
					}
				],
				order: [
					['brigada_nombre', 'ASC']
				]
			}).then(data => {
				// RETORNAR LISTADO
				res.status(200).json({
					estado: true,
					mensaje: 'BRIGADES DE UN LOCAL',
					data: data
				});
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		}else{
			db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => brigadeModel->findByLocal');
		}
	});
};