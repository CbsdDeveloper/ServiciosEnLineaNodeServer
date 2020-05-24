'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const ciiuModel = db.ciiu;
const taxeMdl = db.taxes;
const activityMdl = db.activities;

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
				{ ciiu_codigo_v3: seq.where(seq.fn('LOWER', seq.col('ciiu_codigo_v3')), 'LIKE', '%' + filter + '%') },
				{ ciiu_codigo: seq.where(seq.fn('LOWER', seq.col('ciiu_codigo')), 'LIKE', '%' + filter + '%') },
				{ ciiu_nombre: seq.where(seq.fn('LOWER', seq.col('ciiu_nombre')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await ciiuModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{
							model: taxeMdl, as: 'taxe',
							attributes: [ 'tasa_id','tasa_codigo','tasa_nombre','fk_actividad_id' ],
							include: [
								{
									model: activityMdl, as: 'activity',
									attributes: [ 'actividad_id','actividad_codigo','actividad_nombre' ]
								}
							]
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'LISTADO CIIU V4');
		} catch (error) {
			db.setEmpty(res,'LISTADO CIIU V4',false,error);
		}

	}

}