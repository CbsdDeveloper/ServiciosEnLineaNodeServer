'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const sectionModel = db.rsc.formSections;
const formMdl = db.rsc.forms;
const questionsMdl = db.rsc.formQuestions;

const staffMdl = db.staff;
const personMdl = db.persons;
const resourceMdl = db.resources;

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
			const where = seq.or(
				{ seccion_nombre: seq.where(seq.fn('LOWER', seq.col('seccion_nombre')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await sectionModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					order: [ sort ],
					include: [
						{
							model: formMdl, as: 'form',
							attributes: [ 'formulario_id','formulario_nombre' ],
							required: true,
							where: { formulario_id: req.query.formId }
						},
						{
							model: questionsMdl, as: 'questions',
							order: [ ['pregunta_index'] ],
							include: [
								{
									model: resourceMdl, as: 'src'
								}
							]
						},
						{
							model: staffMdl, as: 'user',
							attributes: [ 'personal_id' ],
							include: [
								{
									model: personMdl, as: 'person',
									attributes: [ 'persona_apellidos','persona_nombres' ]
								}
							]
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'CLASIFICACION DE FORMULARIOS');
		} catch (error) {
			db.setEmpty(res,'CLASIFICACION DE FORMULARIOS',false,error);
		}

	}

}