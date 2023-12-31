'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
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
			const whr = {
				[Op.or]: [
					{ estanteria_edificio: { [Op.iLike]: '%' + filter + '%'} },
					{ estanteria_pasillo: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await model.findAndCountAll(
				{
					include: [{ all: true, include: [{ all: true, include: [{ all: true}] }] }],
					offset: offset,
					limit: limit,
					where: whr,
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ARCHIVO - LISTADO DE ESTANTERIAS');
		} catch (error) {
			db.setEmpty(res,'ARCHIVO - LISTADO DE ESTANTERIAS',false,error);
		}

	}

};
