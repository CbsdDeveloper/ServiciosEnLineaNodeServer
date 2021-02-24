'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const model = db.admin.reports;

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
				{ reporte_nombre: seq.where(seq.fn('LOWER', seq.col('reporte_nombre')), 'LIKE', '%' + filter + '%') },
				{ reporte_jefatura: seq.where(seq.fn('LOWER', seq.col('reporte_jefatura')), 'LIKE', '%' + filter + '%') },
				{ reporte_departamento: seq.where(seq.fn('LOWER', seq.col('reporte_departamento')), 'LIKE', '%' + filter + '%') },
				{ reporte_template: seq.where(seq.fn('LOWER', seq.col('reporte_template')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ADMINISTRACION :: REPORTES');
		} catch (error) {
			db.setEmpty(res,'ADMINISTRACION :: REPORTES',false,error);
		}

	}

};