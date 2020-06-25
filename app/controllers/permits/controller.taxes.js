'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const taxeModel = db.permits.taxes;
const activityMdl = db.permits.activities;

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
				{ tasa_codigo: seq.where(seq.fn('LOWER', seq.col('tasa_codigo')), 'LIKE', '%' + filter + '%') },
				{ tasa_nombre: seq.where(seq.fn('LOWER', seq.col('tasa_nombre')), 'LIKE', '%' + filter + '%') },
				{ actividad_codigo: seq.where(seq.fn('LOWER', seq.col('actividad_codigo')), 'LIKE', '%' + filter + '%') },
				{ actividad_nombre: seq.where(seq.fn('LOWER', seq.col('actividad_nombre')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await taxeModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{
							model: activityMdl, as: 'activity',
							attributes: [ 'actividad_id','actividad_codigo','actividad_nombre' ]
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'CLASIFICACION DE TASAS DE ACTIVIDADES COMERCIALES');
		} catch (error) {
			db.setEmpty(res,'CLASIFICACION DE TASAS DE ACTIVIDADES COMERCIALES',false,error);
		}

	}

}