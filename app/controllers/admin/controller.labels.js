'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const model = db.admin.labels;

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
				{ label_key: seq.where(seq.fn('LOWER', seq.col('label_key')), 'LIKE', '%' + filter + '%') },
				{ label_es: seq.where(seq.fn('LOWER', seq.col('label_es')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ADMINISTRACION :: LABELS');
		} catch (error) {
			db.setEmpty(res,'ADMINISTRACION :: LABELS',false,error);
		}

	}

};