'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const model = db.financialSubprograms;
const programModel = db.financialPrograms;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'subprograma_codigo' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				$or: {
					subprograma_codigo: seq.where(seq.fn('LOWER', seq.col('subprograma_codigo')), 'LIKE', '%' + filter + '%'),
					subprograma_descripcion: seq.where(seq.fn('LOWER', seq.col('subprograma_descripcion')), 'LIKE', '%' + filter + '%')
				}
			};
			const { rows, count } = await model.findAndCountAll(
				{
					include: [ { model: programModel, as: 'program' } ],
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'SUBPROGRMAS FINANCIEROS');
		} catch (error) {
			db.setEmpty(res,'SUBPROGRMAS FINANCIEROS',false,error);
		}

	}

};
