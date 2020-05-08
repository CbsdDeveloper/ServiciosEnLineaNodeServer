'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.wineries;
const station = db.stations;

module.exports = {

	/*
	 * LISTADO DE BODEGAS
	 */
	findAll(req, res){
		model.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE ESTACIONES');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

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
			const where = {
				$or: {
					bodega_nombre: seq.where(seq.fn('LOWER', seq.col('bodega_nombre')), 'LIKE', '%' + filter + '%')
				}
			};
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{ model: station, as: 'station', attributes: ['estacion_nombre','estacion_nombre_alterno'] } 
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'INSTITUTION - BODEGAS');
		} catch (error) {
			db.setEmpty(res,'INSTITUTION - BODEGAS',false,error);
		}

	}

};