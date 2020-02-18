'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const accountcatalog = db.accountcatalog;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'cuenta_codigo' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				$or: {
					cuenta_codigo: seq.where(seq.fn('LOWER', seq.col('cuenta_codigo')), 'LIKE', '%' + filter + '%'),
					cuenta_descripcion: seq.where(seq.fn('LOWER', seq.col('cuenta_descripcion')), 'LIKE', '%' + filter + '%')
				}
			};
			const { rows, count } = await accountcatalog.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'PLAN DE CUENTAS');
		} catch (error) {
			db.setEmpty(res,'PLAN DE CUENTAS',false,error);
		}

	}

};
