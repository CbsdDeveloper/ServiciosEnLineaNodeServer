'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const model = db.financial.financialActivities;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'actividad_codigo' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				$or: {
					actividad_codigo: seq.where(seq.fn('LOWER', seq.col('actividad_codigo')), 'LIKE', '%' + filter + '%'),
					actividad_descripcion: seq.where(seq.fn('LOWER', seq.col('actividad_descripcion')), 'LIKE', '%' + filter + '%')
				}
			};
			const { rows, count } = await model.findAndCountAll(
				{
					include: [{ all: true, include: [{ all: true, include: [{ all: true}] }] }],
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ACTIVIDADES FINANCIERAS');
		} catch (error) {
			db.setEmpty(res,'ACTIVIDADES FINANCIERAS',false,error);
		}

	}

};
