'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.administrative.archivefolder;

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
				{ folder_seriedocumental: seq.where(seq.fn('LOWER', seq.col('folder_seriedocumental')), 'LIKE', '%' + filter + '%') },
				{ folder_subseriedocumental: seq.where(seq.fn('LOWER', seq.col('folder_subseriedocumental')), 'LIKE', '%' + filter + '%') },
				{ folder_anio: seq.where(seq.fn('LOWER', seq.col('folder_anio')), 'LIKE', '%' + filter + '%') },
				{ folder_valordocumental: seq.where(seq.fn('LOWER', seq.col('folder_valordocumental')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					include: [{ all: true, include: [{ all: true, include: [{ all: true}] }] }],
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ARCHIVO - LISTADO DE FOLDERS PARA ARCHIVO');
		} catch (error) {
			db.setEmpty(res,'ARCHIVO - LISTADO DE FOLDERS PARA ARCHIVO',false,error);
		}

	}

};
