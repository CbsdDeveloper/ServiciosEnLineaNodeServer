'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const questionModel = db.rsc.formQuestions;
const sectionMdl = db.rsc.formSections;

const staffMdl = db.staff;
const personMdl = db.persons;

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
			const { rows, count } = await questionModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{
							model: sectionMdl, as: 'section',
							attributes: [ 'seccion_id','seccion_nombre' ]
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