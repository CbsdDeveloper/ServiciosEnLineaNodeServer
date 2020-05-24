'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const planModel = db.plans;

const localMdl = db.locals;
const entityMdl = db.entities;
const trainingMdl = db.academicTraining;
const personMdl = db.persons;

const userMdl = db.users;

module.exports = {

	/*
	 * PERMISOS DE FUNCIONAMIENTO POR ID DE LOCAL
	 */
	async paginateByLocal(req, res){
		
		const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const { rows, count } = await planModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					order: [ sort ],
					where: { '$local.local_id$': req.query.localId },
					include: [
						{
							model: localMdl, as: 'local',
							attributes: [ 'local_id','local_nombrecomercial' ],
							include: [
								{ 
									model: entityMdl, as: 'entity',
									attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc','entidad_contribuyente' ]
								}
							]
						},
						{ 
							model: userMdl, as: 'user',
							attributes: [ ['usuario_login','usuario'] ]
						} ,
						{ 
							model: userMdl, as: 'inspector',
							required: false,
							attributes: [ ['usuario_login','inspector'] ]
						} 
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'PERMISOS ANUALES DE FUNCIONAMIENTO');

	},

	// ENCONTRAR REGISTRO POR ID DE LOCAL
	findByLocalId(req, res){
		// CONDICIONALES DE BUSQUEDA
		var strWhr = { fk_local_id: req.body.localId}
		// CONSULTAR REGISTROS
		planModel.count({
			where: strWhr
		}).then(c => {
			// VALIDAR CONSULTA
			if( c > 0 ){
				planModel.findAll({
					where: strWhr
				}).then(data => {
					// RETORNAR LISTADO
					res.status(200).json({
						estado: true,
						mensaje: 'PLANES DE UN LOCAL',
						data: data
					});
				}).catch(err => { res.status(500).json({msg: "error", details: err}); });
			}else{
				db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => planModel->findByLocalId');
			}
		});
	},

	// ENCONTRAR REGISTRO POR ID DE LOCAL
	findById(req, res){
		// CONDICIONALES DE BUSQUEDA
		var strWhr = { plan_id: req.body.planId }
		// CONSULTAR REGISTROS
		planModel.count({
			where: strWhr
		}).then(c => {
			// VALIDAR CONSULTA
			if( c > 0 ){
				// CONSULTA REGISTRO
				planModel.findOne({
					include:[
						{ 
							model: entityMdl, as: 'billing', 
							include: [
								{ model: personMdl, as: 'person' }
							]
						},
						{ 
							model: localMdl, as: 'local',
							include:[
								{ 
									model: entityMdl, as: 'entity', 
									include: [
										{ model: personMdl, as: 'person' }
									]
								}
							]
						},
						{ 
							model: personMdl, 
							as: 'responsable'
						},
						{ 
							model: trainingMdl, 
							as: 'training'
						},
						{ 
							model: personMdl, 
							as: 'sos'
						}
					],
					where: strWhr
				}).then(data => {
					// RETORNAR LISTADO
					res.status(200).json({
						estado: true,
						mensaje: 'PLAN POR ID',
						data: data
					});
				}).catch(err => { res.status(500).json({msg: "error", details: err}); });
			}else{
				db.setEmpty(res,'NO SE HA ENCONTRADO EL REGISTRO => planModel->findById');
			}
		});
	},

	// ACTUALIZAR REGISTROS
	updateEntity(req, res){
		// ACTUALIZAR DATOS DE LOCAL
		planModel.update(
			req.body,
			{
				where: { plan_id: req.body.plan_id }
			}
		).then(data => {
			res.status(200).json({
				estado: true,
				mensaje: 'ACTUALIZAR REGISTRO planModel->updateEntity',
				data: req.body
			});
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// ACTUALIZAR RELACION CON REGISTROS
	updateResourcesEntity(req, res){

		// TRANSACCION
		db.sequelize.transaction( async transaction => {

			// DECLARACION DE VARIABLES
			let strWhr, plan, billing, sos, training, responsableData, responsableTemp, sosData, sosTemp;

			// ACTUALIZAR DATOS DE  PLAN
			await planModel.update(req.body, { where: { plan_id: req.body.plan_id } }, {transaction: transaction} );
			// OBTENER MODELO - PLAN DE AUTOPROTECCION
			plan = await planModel.findOne({
				where: { plan_id: req.body.plan_id }, 
				include: [ 
					{ model: personMdl, as: 'sos' },
					{ model: personMdl, as: 'responsable' },
					{ model: trainingMdl, as: 'training' },
					{ model: entityMdl, as: 'billing' },
					{ 
						model: localMdl, as: 'local',
						include: [
							{ 
								model: entityMdl, as: 'entity', 
								include: {
									model: personMdl,
									as: 'person'
								}
							}
						]
					}
				]
			});

			// OBTENER MODELO - ENTIDAD COMERCIAL
			billing = await entityMdl.findByPk((req.body.plan_facturacion=='OTRA') ? req.body.billing.entidad_id : req.body.local.fk_entidad_id);
			// ACTUALIZAR MODELO - FACTURACION
			await plan.setBilling(billing, {transaction: transaction});
			
			// OBTENER MODELO - ENTIDAD COMERCIAL
			if(req.body.plan_responsable_tramite=='REPRESENTANTE LEGAL'){
				// MODELO AUXILIAR
				responsableData = await personMdl.findByPk(plan.local.entity.fk_representante_id);
			}else{
				// MODELO TEMPORAL - RESPONSABLE DEL TRAMITE
				responsableData = db.cloneObjArray(req.body.responsable,['persona_tipo_doc','persona_doc_identidad','persona_apellidos','persona_nombres','persona_celular','persona_correo']);
				// SENTENCIA WHERE
				strWhr = { persona_doc_identidad: req.body.responsable.persona_doc_identidad };
				// OBTENER MODELO - RESPONSABLE DEL PLAN DE AUTOPROTECCION
				responsableTemp = await personMdl.findOne({ where: strWhr });
				// CREAR/ACTUALIZAR MODELO
				if( responsableTemp ) {
					await personMdl.update( responsableData, { where: strWhr }, {transaction: transaction} );
					responsableData = await personMdl.findByPk(req.body.responsable.persona_id);
				} else responsableData = await personMdl.create( responsableData, {transaction: transaction} );
			}
			// ACTUALIZAR MODELO - FACTURACION
			await plan.setResponsable(responsableData, {transaction: transaction});

			// DATOS DEL RESPONSABLE DE IMPLEMENTACION DEL PLAN DE AUTOPROTECCION
			if(req.body.plan_sos=='REPRESENTANTE LEGAL'){
				// MODELO AUXILIAR
				sosData = await personMdl.findByPk(plan.local.entity.fk_representante_id);
				// ACTUALIZAR MODELO - FACTURACION
				await plan.setSos(sosData, {transaction: transaction});
			}else{
				// MODELO TEMPORAL - RESPONSABLE DEL PLAN DE AUTOPROTECCION
				let personData = db.cloneObjArray(req.body.sos,['persona_tipo_doc','persona_doc_identidad','persona_apellidos','persona_nombres','persona_celular','persona_correo']);
				// SENTENCIA WHERE
				strWhr = { persona_doc_identidad: personData.persona_doc_identidad };
				// OBTENER MODELO - RESPONSABLE DEL PLAN DE AUTOPROTECCION
				sosTemp = await personMdl.findOne({ where: strWhr });
				// CREAR/ACTUALIZAR MODELO
				if( sosTemp ) {
					await personMdl.update( personData, { where: strWhr }, {transaction: transaction} );
					sosData = await personMdl.findByPk(req.body.sos.persona_id);
				} else sosData = await personMdl.create( personData, {transaction: transaction} );
				// ACTUALIZAR MODELO - FACTURACION
				await plan.setSos(sosData, {transaction: transaction});
				
				// VALIDAR EL TIPO DE PROFESIONAL
				if( plan.plan_sos=='PROFESIONAL DE SEGURIDAD DE LA EMPRESA' || plan.plan_sos=='PROFESIONAL CONTRATADO EXTERNAMENTE POR LA EMPRESA' ){
					// SENTENCIA DE EXCLUSION 
					strWhr = { formacion_senescyt: req.body.training.formacion_senescyt };
					// GENERAR MODELO DE FORMACION ACADEMICA
					let trainingData = await db.cloneObjArray(req.body.training,['formacion_institucion','formacion_nivel','formacion_titulo','formacion_senescyt','formacion_fregistro']);
					trainingData.fk_persona_id = sosData.persona_id;
					// CONSULTAR SI EXISTE EL REGISTRO
					training = await trainingMdl.findOne({ where: strWhr });
					// CREAR/ACTUALIZAR MODELO
					if( training ){
						await trainingMdl.update( trainingData, { where: strWhr }, {transaction: transaction} );
						training = await trainingMdl.findOne({ where: strWhr });
					} else training = await trainingMdl.create( trainingData, {transaction: transaction} );
					// ACTUALIZAR MODELO - DATOS DE RESPONSABLE
					await plan.setTraining(training, {transaction: transaction});
				}
			}
			
		}).then(result => {
			db.setEmpty(res,'¡Datos actualizados correctamente!',true,req.body);
		}).catch(err => {
			db.setEmpty(res,'¡Error en el proceso!',false,err); 
		});

		
	}

}