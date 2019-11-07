'use strict';
const db = require('../../models');
const brigadeModel = db.brigades;
const personModel = db.persons;
const brigadistModel = db.brigadists;

module.exports = {

	// ENCONTRAR REGISTRO POR ID DE LOCAL
	insertEntity(req, res){
		
		// TRANSACCION
		db.sequelize.transaction(async (t) => {

			// CONDICIONALES DE BUSQUEDA
			let strWhr = {
				fk_local_id: req.body.fk_local_id,
				brigada_nombre: req.body.brigada_nombre
			};
			// ELIMINAR ID DE REGISTROS
			let modelTemp = {
				brigade: db.cloneObj(req.body,'brigada_id'),
				responsable: db.cloneObjArray(req.body.responsable,['persona_tipo_doc','persona_doc_identidad','persona_apellidos','persona_nombres']),
				junior: null
			};

			// CREAR RESPONSABLE
			let responsable = await personModel.findOrCreate({
				where: { persona_doc_identidad: modelTemp.responsable.persona_doc_identidad },
				defaults: modelTemp.responsable
			}).then(async ([data, created]) => { return data; });
		
			// CREAR BRIGADA
			let brigade = await brigadeModel.findOrCreate({
				where: strWhr, 
				defaults: modelTemp.brigade
			}).then(async ([data, created]) => {
				if(created) await brigadeModel.update( data, { where: { brigada_id: req.body.brigada_id } }, t );
				return data;
			});

			// CREAR SUBALTERNO
			if(req.body.junior){
				// CREACION DE SUBALTERNO DE GUARDIA
				modelTemp.junior=db.cloneObjArray(req.body.junior,['persona_tipo_doc','persona_doc_identidad','persona_apellidos','persona_nombres']);
				let junior = await personModel.findOrCreate({
					where: { persona_doc_identidad: modelTemp.junior.persona_doc_identidad },
					defaults: modelTemp.junior,
					t
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
		
	},

	// ENCONTRAR REGISTRO POR ID DE LOCAL
	findByLocal(req, res){
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
	},

	// ELIMINAR BRIGADA
	deleteEntity(req, res){

		brigadeModel.findByPk(req.params.brigadeId).then(brigade => {
			
			brigadistModel.destroy({
				where: { fk_brigada_id: brigade.brigada_id }
			}).then(result => {

				brigade.destroy().then(result => {
					db.setEmpty(res,'¡Registro eliminado correctamente!');
				});

			});

		}).then(function(){
			
		}).catch(function(err){throw err;});

	}

};