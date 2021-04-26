'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const edocModel = db.administrative.edocMsg;

const recipientMdl = db.administrative.edocRecipients;

const ppersonalMdl = db.tthh.ppersonal;
const staffMdl = db.tthh.staff;
const personMdl = db.resources.persons;

const userMdl = db.admin.users;

/*
* CONSULTAR INFORMACION DE PERSONAL POR NUMERO DE CEDULA
*/
const getStaffInfo = async (entityId) => {

	let user = await userMdl.findByPk(entityId);

    // VARIABLES AUXILIARES
    let strWhr = {
		include: [{ model: personMdl, as: 'person' }],
		where: { fk_persona_id: user.fk_persona_id }
	};

    // VALIDAR EXISTENCIA DE REGISTROS
    if( await staffMdl.count( strWhr ) >0 ) return db.parseJSON('ok', true, await staffMdl.findOne( strWhr ));

    // ENVIAR MENSAJE POR DEFECTO
    return db.parseJSON('No se ha encontrado ningún registro con los datos que usted a ingresado.');
};

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			
			const whr = {
				[Op.and]: [
					{ delectronica_estado: ['ENTREGADO','BORRADOR'] },
					{
						[Op.or]: [
							{ delectronica_documento_anexo: { [Op.iLike]: '%' + filter + '%'} },
							{ delectronica_asunto: { [Op.iLike]: '%' + filter + '%'} },
							{ delectronica_nombre: { [Op.iLike]: '%' + filter + '%'} },

							{ '$subscribe.staff.personal_correo_institucional$': { [Op.iLike]: '%' + filter + '%'} },
							{ '$subscribe.staff.person.persona_nombres$': { [Op.iLike]: '%' + filter + '%'} },
							{ '$subscribe.staff.person.persona_apellidos$': { [Op.iLike]: '%' + filter + '%'} }
						]
					}	
				]
			};

			/*
			const { rows, count } = await edocModel.findAndCountAll({
				include: [
					{
						model: ppersonalMdl, as: 'subscribe',
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: ['personal_correo_institucional','personal_id'],
								include: [
									{
										model: personMdl, as: 'person',
										attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
									}
								]
							}
						]
					},
					{
						model: recipientMdl, as: 'recipients',
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: ['personal_correo_institucional','personal_id'],
								include: [
									{
										model: personMdl, as: 'person',
                    					attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
									}
								]
							}
						]
					},
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					}
				],
				where: whr,
				offset: offset,
				limit: limit,
				order: [
					[ 'delectronica_entregado', 'DESC' ]
				],
				distinct: true
			});	
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'EDOC - INBOX');
			*/


			const count = await edocModel.count({
				where: whr,
				include: [
					{
						model: ppersonalMdl, as: 'subscribe',
						attributes: ['ppersonal_id'],
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: ['personal_correo_institucional','personal_id'],
								include: [
									{
										model: personMdl, as: 'person',
										attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
									}
								]
							}
						]
					}
				]
			});

			const rows = await edocModel.findAll({
				include: [
					{
						model: ppersonalMdl, as: 'subscribe',
						attributes: ['ppersonal_id'],
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: ['personal_correo_institucional','personal_id'],
								include: [
									{
										model: personMdl, as: 'person',
										attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
									}
								]
							}
						]
					},/*
					{
						model: recipientMdl, as: 'recipients',
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: ['personal_correo_institucional','personal_id'],
								include: [
									{
										model: personMdl, as: 'person',
                    					attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
									}
								]
							}
						]
					},*/
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					}
				],
				where: whr,
				offset: offset,
				limit: limit,
				
				/*group: [ 
					'fk_delectronica_id',
					'personal_correo_institucional','personal_id',
					'persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular' 
				],*/

				order: [
					[ 'delectronica_entregado', 'DESC' ]
				]
			});


			const meta = paginate(currentPage, count, rows, pageLimit);

			db.setDataTable(res,{ rows, meta },'DOCUMENTACION ELECTRONICA');

		} catch (error) {
			db.setEmpty(res,'EDOC - INBOX',false,error);
		}
		
	},

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntityDeleted(req, res){
		
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);

			const whr = {
				[Op.and]: [
					{ delectronica_estado: 'ELIMINADO' },
					{
						[Op.or]: [
							{ delectronica_documento_anexo: { [Op.iLike]: '%' + filter + '%'} },
							{ delectronica_asunto: { [Op.iLike]: '%' + filter + '%'} },
							{ delectronica_nombre: { [Op.iLike]: '%' + filter + '%'} },

							{ '$subscribe.staff.personal_correo_institucional$': { [Op.iLike]: '%' + filter + '%'} },
							{ '$subscribe.staff.person.persona_nombres$': { [Op.iLike]: '%' + filter + '%'} },
							{ '$subscribe.staff.person.persona_apellidos$': { [Op.iLike]: '%' + filter + '%'} }
						]
					}	
				]
			};

			const { rows, count } = await edocModel.findAndCountAll({
				include: [
					{
						model: ppersonalMdl, as: 'subscribe',
						attributes: ['ppersonal_id'],
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: ['personal_correo_institucional','personal_id'],
								include: [
									{
										model: personMdl, as: 'person',
										attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
									}
								]
							}
						]
					},
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					}
				],
				where: whr,
				offset: offset,
				limit: limit,
				order: [
					[ 'delectronica_entregado', 'DESC' ]
				],
				distinct: true
			});	
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'EDOC - INBOX');

		} catch (error) {
			db.setEmpty(res,'EDOC - INBOX',false,error);
		}
		
	},

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntityBySession(req, res){
		
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const whr = {
				[Op.or]: [
					{ fk_destinatario_id: req.query.sessionId }
				]
			};
			const { rows, count } = await recipientMdl.findAndCountAll({
				include: [
					{
						model: edocModel, as: 'edoc',
						required: true,
						where: {
							delectronica_estado: ['BORRADOR','ENTREGADO'],
						},
						include: [
							{
								model: ppersonalMdl, as: 'subscribe',
								attributes: ['ppersonal_id'],
								include: [
									{
										model: staffMdl, as: 'staff',
										attributes: ['personal_correo_institucional','personal_id'],
										include: [
											{
												model: personMdl, as: 'person',
												attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
											}
										]
									}
								]
							},
							{
								model: staffMdl, as: 'user',
								attributes: ['personal_correo_institucional'],
								include: [{
									model: personMdl, as: 'person',
									attributes: ['persona_nombres','persona_apellidos']
								}]
							}
						]
					},
				],
				where: whr,
				offset: offset,
				limit: limit,
				order: [
					[ {model: edocModel, as: 'edoc'}, 'delectronica_entregado', 'DESC' ]
				]
			});	
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'EDOC - INBOX');
		} catch (error) {
			db.setEmpty(res,'EDOC - INBOX',false,error);
		}
		
	},

	/*
	 * REGISTRAR BORRADOR PARA MENSAJE
	 */
	async composeDraft(req, res){

		try {

			// OBTENER DATOS DE FORMULARIO
			let { body } = req;

			// CONTABILIZAR CUANTOS BORRADOR TIENE
			let [draft, created] = await edocModel.findOrCreate({
				where: {
					fk_personal_id: body.responsible,
					delectronica_estado: 'BORRADOR'
				},
				defaults: {
					fk_personal_id: body.responsible,
					delectronica_estado: 'BORRADOR',
					delectronica_registro: db.getCurrentDate()
				}
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'edoc - ¡Borrador creado con éxito!',true,{entityId:draft.delectronica_id});

		} catch (error) {
			db.setEmpty(res,'BORRADOR - DOCUMENTACION ELECTRONICA',false,error);
		}

	},

	/*
	 * ELIMINAR DESTINATARIOS
	 */
	async deleteEntity(req, res){

		try {
			// OBTENER DATOS DE FORMULARIO
			let { query } = req, staff = await getStaffInfo(query.sessionId);

			// MOVER A LA PAPELERA EDOC
			await edocModel.update(
				{
					delectronica_estado: 'ELIMINADO',
					fk_personal_id: staff.data.personal_id,
					maintenance_registro: db.getCurrentDate()
				},
				{ where: { delectronica_id: query.entityId } }
			);
			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Su registro ha sido movido a la papelera correctamente!',true,query);

		} catch (error) {
			db.setEmpty(res,'EDOC - REMOVE RECIPIENT',false,error);
		}

	},

	/*
	 * ELIMINAR DESTINATARIOS
	 */
	async restoreEntity(req, res){

		try {
			// OBTENER DATOS DE FORMULARIO
			let { query } = req, staff = await getStaffInfo(query.sessionId);

			// MOVER A LA PAPELERA EDOC
			await edocModel.update(
				{
					delectronica_estado: 'ENTREGADO',
					fk_personal_id: staff.data.personal_id,
					maintenance_registro: db.getCurrentDate()
				},
				{ where: { delectronica_id: query.entityId } }
			);
			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Su registro ha sido movido a la papelera correctamente!',true,query);

		} catch (error) {
			db.setEmpty(res,'EDOC - REMOVE RECIPIENT',false,error);
		}

	},

	/*
	 * BUSCAR DETALLE DE BORRADOR
	 */
	async detailByEntityId(req, res){

		try {

			// OBTENER DATOS DE FORMULARIO
			let { body } = req;

			// CONTABILIZAR CUANTOS BORRADOR TIENE
			let draft = await edocModel.findOne({
				where: { delectronica_id: body.entityId },
				include: [
					{
						model: ppersonalMdl, as: 'subscribe',
						attributes: ['ppersonal_id'],
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: ['personal_correo_institucional','personal_id'],
								include: [
									{
										model: personMdl, as: 'person',
                    					attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
									}
								]
							}
						]
					},
					{
						model: recipientMdl, as: 'recipients',
						include: [
							{
								model: staffMdl, as: 'staff',
								attributes: ['personal_correo_institucional','personal_id'],
								include: [
									{
										model: personMdl, as: 'person',
                    					attributes: ['persona_apellidos','persona_nombres','persona_doc_identidad','persona_imagen','persona_correo','persona_celular']
									}
								]
							}
						]
					}
				]
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'Detalle de borrador',true,draft);

		} catch (error) {
			db.setEmpty(res,'DETALLE DE REGISTRO - EDOC',false,error);
		}

	},

	/*
	 * REGISTRAR REMITENTE DE DOCUMENTACION
	 */
	async setSender(req, res){

		try {

			// OBTENER DATOS DE FORMULARIO
			let { body } = req;

			// CONTABILIZAR CUANTOS BORRADOR TIENE
			let draft = await edocModel.findByPk(body.entityId);

			// BUSCAR PERSONAL
			let subscribe = await ppersonalMdl.findOne({
				attributes: ['ppersonal_id'],
				where: {
					fk_personal_id: body.sender.personal_id,
					ppersonal_estado: 'EN FUNCIONES'
				}
			});

			// SETTEAR REMITENTE
			// await draft.update({ fk_remitente_id: subscribe.ppersonal_id });
			draft.setSubscribe(subscribe);

			// LISTAR COMO DESTINATARIO
			await recipientMdl.findOrCreate({
				where: {
					fk_destinatario_id: body.sender.personal_id,
					fk_delectronica_id	: body.entityId
				},
				defaults: {
					fk_personal_id: body.sender.personal_id,

					fk_destinatario_id: body.sender.personal_id,
					fk_delectronica_id	: body.entityId,
					
					destinatario_registro: db.getCurrentDate(),
					destinatario_fentregado: db.getCurrentDate()
				}
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Remitente ingresado con éxito!',true,draft);

		} catch (error) {
			db.setEmpty(res,'EDOC - SET SENDER',false,error);
		}

	},

	/*
	 * REGISTRAR DESTINATARIOS
	 */
	async setRecipients(req, res){

		try {

			// OBTENER DATOS DE FORMULARIO
			let { body } = req;

			// CONTABILIZAR CUANTOS BORRADOR TIENE
			let [recipient, created] = await recipientMdl.findOrCreate({
				where: {
					fk_destinatario_id: body.recipient.personal_id,
					fk_delectronica_id	: body.entityId
				},
				defaults: {
					fk_personal_id: 159,

					fk_destinatario_id: body.recipient.personal_id,
					fk_delectronica_id	: body.entityId,
					
					destinatario_registro: db.getCurrentDate(),
					destinatario_fentregado: db.getCurrentDate()
				}
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'Destinatario ingresado con éxito!',true,recipient);

		} catch (error) {
			db.setEmpty(res,'EDOC - SET RECIPIENT',false,error);
		}

	},

	/*
	 * ELIMINAR DESTINATARIOS
	 */
	async deleteRecipient(req, res){

		try {

			// OBTENER DATOS DE FORMULARIO
			let { query } = req;

			await recipientMdl.destroy({ where: { destinatario_id	: query.entityId } });

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'Destinatario eliminado con éxito!',true,query);

		} catch (error) {
			db.setEmpty(res,'EDOC - REMOVE RECIPIENT',false,error);
		}

	},

};
