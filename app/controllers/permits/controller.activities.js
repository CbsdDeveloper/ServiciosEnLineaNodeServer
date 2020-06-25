'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const activityModel = db.permits.activities;

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
				{ actividad_codigo: seq.where(seq.fn('LOWER', seq.col('actividad_codigo')), 'LIKE', '%' + filter + '%') },
				{ actividad_nombre: seq.where(seq.fn('LOWER', seq.col('actividad_nombre')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await activityModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'CLASIFICACION DE ACTIVIDADES COMERCIALES');
		} catch (error) {
			db.setEmpty(res,'CLASIFICACION DE ACTIVIDADES COMERCIALES',false,error);
		}

	},

	// LISTADO DE ACTIVIDADES
	findCommercialActivities(req, res){
		activityModel.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE ACTIVIDADES');
		}).catch(err => {
			res.status(500).json({msg: "error", details: err});
		});
	}

}