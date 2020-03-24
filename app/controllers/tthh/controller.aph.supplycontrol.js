'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const model = db.aphSupplycontrol;
const cellar = db.wineries;

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
				{ inventario_codigo: seq.where(seq.fn('LOWER', seq.col('inventario_codigo')), 'LIKE', '%' + filter + '%') },
				{ inventario_tipo: seq.where(seq.fn('LOWER', seq.col('inventario_tipo')), 'LIKE', '%' + filter + '%') },
				{ inventario_fecha_registro: seq.where(seq.fn('LOWER', seq.col('inventario_fecha_registro')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{ model: cellar, as: 'cellar', attributes: ['bodega_nombre'] }
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'APH - CONTROL DE INSUMOS');
		} catch (error) {
			db.setEmpty(res,'APH - CONTROL DE INSUMOS',false,error);
		}

	}

};