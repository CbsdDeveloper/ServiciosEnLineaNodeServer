'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');
const { RecordingInstance } = require('twilio/lib/rest/api/v2010/account/call/recording');

const edocModel = db.administrative.edocMsg;

const recipientMdl = db.administrative.edocRecipients;

const ppersonalMdl = db.tthh.ppersonal;
const staffMdl = db.tthh.staff;
const personMdl = db.resources.persons;

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
				[Op.or]: [
					{ fk_destinatario_id: req.query.sessionId }
				]
			};
			const { rows, count } = await recipientMdl.findAndCountAll({
				include: [
					{
						model: edocModel, as: 'edoc',
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
				where: {
					fk_personal_id: body.sender.personal_id,
					ppersonal_estado: 'EN FUNCIONES'
				}
			});

			// SETTEAR REMITENTE
			draft.setSubscribe(subscribe);

			// LISTAR COMO DESTINATARIO
			await recipientMdl.findOrCreate({
				where: {
					fk_destinatario_id: body.sender.personal_id,
					fk_delectronica_id	: body.entityId
				},
				defaults: {
					fk_personal_id: 159,

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
			db.setEmpty(res,'EDOC - SET SENDER',false,error);
		}

	},

};
