'use strict';
const db = require('../../models');
const planModel = db.plans;
const localModel = db.locals;
const entityModel = db.entities;
const trainingModel = db.academicTraining;
const personModel = db.persons;

// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.findByLocalId = (req, res) => {
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
};

// ENCONTRAR REGISTRO POR ID DE LOCAL
exports.findById = (req, res) => {
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
						model: entityModel, as: 'billing', 
						include: [
							{ model: personModel, as: 'person' }
						]
					},
					{ 
						model: localModel, as: 'local',
						include:[
							{ 
								model: entityModel, as: 'entity', 
								include: [
									{ model: personModel, as: 'person' }
								]
							}
						]
					},
					{ 
						model: personModel, 
						as: 'responsable'
					},
					{ 
						model: trainingModel, 
						as: 'training'
					},
					{ 
						model: personModel, 
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
};

// ACTUALIZAR REGISTROS
exports.updateEntity = (req, res) => {
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
};

// ACTUALIZAR RELACION CON REGISTROS
exports.updateResourcesEntity = (req, res) => {

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
				{ model: personModel, as: 'sos' },
				{ model: personModel, as: 'responsable' },
				{ model: trainingModel, as: 'training' },
				{ model: entityModel, as: 'billing' },
				{ 
					model: localModel, as: 'local',
					include: [
						{ 
							model: entityModel, as: 'entity', 
							include: {
								model: personModel,
								as: 'person'
							}
						}
					]
			 	}
			]
		});

		// OBTENER MODELO - ENTIDAD COMERCIAL
		billing = await entityModel.findByPk((req.body.plan_facturacion=='OTRA') ? req.body.billing.entidad_id : req.body.local.fk_entidad_id);
		// ACTUALIZAR MODELO - FACTURACION
		await plan.setBilling(billing, {transaction: transaction});
		
		// OBTENER MODELO - ENTIDAD COMERCIAL
		if(req.body.plan_responsable_tramite=='REPRESENTANTE LEGAL'){
			// MODELO AUXILIAR
			responsableData = await personModel.findByPk(plan.local.entity.fk_representante_id);
		}else{
			// MODELO TEMPORAL - RESPONSABLE DEL TRAMITE
			responsableData = db.cloneObjArray(req.body.responsable,['persona_tipo_doc','persona_doc_identidad','persona_apellidos','persona_nombres','persona_celular','persona_correo']);
			// SENTENCIA WHERE
			strWhr = { persona_doc_identidad: req.body.responsable.persona_doc_identidad };
			// OBTENER MODELO - RESPONSABLE DEL PLAN DE AUTOPROTECCION
			responsableTemp = await personModel.findOne({ where: strWhr });
			// CREAR/ACTUALIZAR MODELO
			if( responsableTemp ) {
				await personModel.update( responsableData, { where: strWhr }, {transaction: transaction} );
				responsableData = await personModel.findByPk(req.body.responsable.persona_id);
			} else responsableData = await personModel.create( responsableData, {transaction: transaction} );
		}
		// ACTUALIZAR MODELO - FACTURACION
		await plan.setResponsable(responsableData, {transaction: transaction});

		// DATOS DEL RESPONSABLE DE IMPLEMENTACION DEL PLAN DE AUTOPROTECCION
		if(req.body.plan_sos=='REPRESENTANTE LEGAL'){
			// MODELO AUXILIAR
			sosData = await personModel.findByPk(plan.local.entity.fk_representante_id);
			// ACTUALIZAR MODELO - FACTURACION
			await plan.setSos(sosData, {transaction: transaction});
		}else{
			// MODELO TEMPORAL - RESPONSABLE DEL PLAN DE AUTOPROTECCION
			let personData = db.cloneObjArray(req.body.sos,['persona_tipo_doc','persona_doc_identidad','persona_apellidos','persona_nombres','persona_celular','persona_correo']);
			// SENTENCIA WHERE
			strWhr = { persona_doc_identidad: personData.persona_doc_identidad };
			// OBTENER MODELO - RESPONSABLE DEL PLAN DE AUTOPROTECCION
			sosTemp = await personModel.findOne({ where: strWhr });
			// CREAR/ACTUALIZAR MODELO
			if( sosTemp ) {
				await personModel.update( personData, { where: strWhr }, {transaction: transaction} );
				sosData = await personModel.findByPk(req.body.sos.persona_id);
			} else sosData = await personModel.create( personData, {transaction: transaction} );
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
				training = await trainingModel.findOne({ where: strWhr });
				// CREAR/ACTUALIZAR MODELO
				if( training ){
					await trainingModel.update( trainingData, { where: strWhr }, {transaction: transaction} );
					training = await trainingModel.findOne({ where: strWhr });
				} else training = await trainingModel.create( trainingData, {transaction: transaction} );
				// ACTUALIZAR MODELO - DATOS DE RESPONSABLE
				await plan.setTraining(training, {transaction: transaction});
			}
		}
		
	}).then(result => {
		db.setEmpty(res,'¡Datos actualizados correctamente!',true,req.body);
	}).catch(err => {
		db.setEmpty(res,'¡Error en el proceso!',false,err); 
	});

	
};