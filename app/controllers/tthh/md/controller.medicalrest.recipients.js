'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.tthh.medicalrestRecipients;
const staffModel = db.tthh.staff;
const personModel = db.resources.persons;

module.exports = {

	/**
	 * @function newRecipient
	*/
	async newRecipient(req, res, next){

		try {

			// FORMULARIO ENVIADO
			let data = req.body, aux, responsible;

			// MODELO DE CONSULTA DE CEDULA ENVIADA
			const staffWhr = {
				include: [ { 
					model: personModel, as: 'person',
					attributes: [ 'persona_apellidos', 'persona_nombres', 'persona_doc_identidad' ],
					where: { persona_doc_identidad: data.code }
				} ]
			};
			// CONSULTAR SI EXISTE EL NUMERO DE CEDULA INGRESADO
			if( await staffModel.count( staffWhr ) < 1 ) return db.endConection(res,next,'EL NÚMERO DE CÉDULA PROPORCIONADO NO CORRESPONDE A NINGUNO DE LOS REGISTROS DE LA BASE DE DATOS.');
			// OBTENER DATOS DE CEDULA
			aux = await staffModel.findOne( staffWhr );

			// CONSULTAR EXISTENCIA DESTINATARIO RELACIONADO CON PERSONAL
			if( await model.count( { where: { fk_destinatario_id: aux.personal_id } } ) > 0 ) return db.endConection(res,next,'AL PARECER YA SE HA REGISTRADO A ESTE USUARIO, FAVOR, REVISE EL LISTADO E INTENTE NUEVAMENTE.');
			

			// CONSULTAR INFORMACION DE RESPONSABLE
			responsible = await staffModel.findOne({ where: { fk_persona_id: data.fkId } });


			// REGISTRAR MODELO
			await model.create( { fk_destinatario_id: aux.personal_id, fk_personal_id: responsible.personal_id } );

			// ENVIAR RESPUESTA
			db.setEmpty(res,'¡SU REGISTRO SE HA GUARDADO CORRECTAMENTE!');

		} catch (error) { return db.endConection(res,next,'ERROR AL REGISTRAR EL DESTINATARIO PARA LA NOTIFICACIÓN DE CERTIFICADOS MEDICOS (00X1).'); }

	},

	/**
	 * @function newAttendedByPrtId
	*/
	async removeRecipientById(req, res, next){

		try {

			// ELIMINAR REGISTRO
			model.destroy({ where: { destinatario_id: req.query.entityId } });
			// ENVIAR RESPUESTA
			db.setEmpty(res,'¡REGISTRO ELIMINADO CORRECTAMENTE!');

		} catch (error) { return db.endConection(res,next,'ERROR AL ELIMINAR EL REGISTRO (00X1).'); }

	},

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
			const where = seq.or(
				{ destinatario_registro: seq.where(seq.fn('LOWER', seq.col('destinatario_registro')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [ {
						model: staffModel, as: 'staff',
						attributes : ['personal_correo_institucional'],
						include: [ { 
							model: personModel, as: 'person',
							attributes: [ 'persona_apellidos', 'persona_nombres', 'persona_doc_identidad' ]
						} ]
					},{
						model: staffModel, as: 'responsible',
						attributes : ['personal_correo_institucional'],
						include: [ { 
							model: personModel, as: 'person',
							attributes: [ 'persona_apellidos', 'persona_nombres', 'persona_doc_identidad' ]
						} ]
					} ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'DEP. MEDICO - LISTADO DE DESTINATARIOS DE NOTIFICACIONES DE CERTIFICADOS MEDICOS');
		} catch (error) {
			db.setEmpty(res,'DEP. MEDICO - LISTADO DE DESTINATARIOS DE NOTIFICACIONES DE CERTIFICADOS MEDICOS',false,error);
		}

	}

};