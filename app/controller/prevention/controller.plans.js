const db = require('../../config/db.config.js');
const planModel = db.plans;
const localModel = db.locals;
const entityModel = db.entities;
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
						include: [
							{ model: personModel, as: 'sos' }
						]
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
	// ACTUALIZAR DATOS DE FACTURACION
	req.body.facturacion_id = (req.body.plan_facturacion=='OTRA') ? req.body.billing.entidad_id : req.body.local.fk_entidad_id;
	// ACTUALIZAR DATOS DE PLAN
	planModel.update(
		req.body,
		{ where: { plan_id: req.body.plan_id } }
	).then(data => {
		// CONDICIONAL
		strWhr = { persona_doc_identidad: req.body.sos.persona_doc_identidad };
		// CONSULTAR SI EXISTE EL REGISTRO
		personModel.findOrCreate({
			where: strWhr, 
			defaults: req.body.sos
		}).then(([user, created]) => {
			// ID DE PROFESIONAL
			sosId = req.body.sos.persona_id;
			// VALIDAR SI SE HA CREADO EL REGISTRO Y ACTUALIZAR
			if( !created ){
				personModel.update(
					req.body.sos,
					{ where: strWhr }
				).then(() => {})
			}else{ sosId = user.persona_id; }
			// ACTUALIZAR DATOS DE LOCAL
			localModel.update(
				{ local_id: req.body.fk_local_id, fk_sos_id: sosId },
				{ where: { local_id: req.body.local.local_id } }
			).then(data => {
				// ACTUALIZAR DATOS DE PLAN
				planModel.update(
					{ plan_id: req.body.plan_id, plan_elaborado: req.body.plan_elaborado, plan_ciudad: req.body.plan_ciudad },
					{ where: { plan_id: req.body.plan_id } }
				).then(data => {
					// RETORNAR MENSAJE
					res.status(200).json({
						estado: true,
						mensaje: '¡Datos actualizados correctamente!',
						data: req.body
					});
				}).catch(err => { res.status(500).json({msg: "error", details: err}); });
			}).catch(err => { res.status(500).json({msg: "error", details: err}); });
		});
	}).catch(err => { res.status(500).json({msg: "error", details: err}); });
};