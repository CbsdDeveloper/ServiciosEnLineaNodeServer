'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.administrative.archiveshelving;

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
				{ estanteria_edificio: seq.where(seq.fn('LOWER', seq.col('estanteria_edificio')), 'LIKE', '%' + filter + '%') },
				{ estanteria_pasillo: seq.where(seq.fn('LOWER', seq.col('estanteria_pasillo')), 'LIKE', '%' + filter + '%') }
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
			db.setDataTable(res,{ rows, meta },'ARCHIVO - LISTADO DE ESTANTERIAS');
		} catch (error) {
			db.setEmpty(res,'ARCHIVO - LISTADO DE ESTANTERIAS',false,error);
		}

	}

};
