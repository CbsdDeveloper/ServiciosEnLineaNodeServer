'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const budgetclassifier = db.budgetclassifier;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'clasificador_codigo' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				$or: {
					clasificador_codigo: seq.where(seq.fn('LOWER', seq.col('tb_clasificadorpresupuestario.clasificador_codigo')), 'LIKE', '%' + filter + '%'),
					clasificador_nombre: seq.where(seq.fn('LOWER', seq.col('tb_clasificadorpresupuestario.clasificador_nombre')), 'LIKE', '%' + filter + '%')
				}
			};
			const { rows, count } = await budgetclassifier.findAndCountAll(
				{
					include:[ { model: budgetclassifier, as: 'parent' } ],
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'CLASIFICADOR PRESUPUESTARIO');
		} catch (error) {
			db.setEmpty(res,'CLASIFICADOR PRESUPUESTARIO',false,error);
		}

	}

};
