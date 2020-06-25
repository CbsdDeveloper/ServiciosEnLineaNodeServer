'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const model = db.financial.financialPrograms;
const staffModel = db.tthh.staff;
const personModel = db.resources.persons;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'programa_codigo' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				$or: {
					programa_codigo: seq.where(seq.fn('LOWER', seq.col('programa_codigo')), 'LIKE', '%' + filter + '%'),
					programa_descripcion: seq.where(seq.fn('LOWER', seq.col('programa_descripcion')), 'LIKE', '%' + filter + '%')
				}
			};
			const incStaff = {
				model: staffModel, as: 'staff', attributes: ['personal_correo_institucional'], 
				include: [{ model: personModel, as: 'person', attributes: [[seq.literal("persona_apellidos||' '||persona_nombres"),"usuario"]] }]
			};
			const { rows, count } = await model.findAndCountAll(
				{
					include:[ incStaff ],
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'PROGRMAS FINANCIEROS');
		} catch (error) {
			db.setEmpty(res,'PROGRMAS FINANCIEROS',false,error);
		}

	}

};
