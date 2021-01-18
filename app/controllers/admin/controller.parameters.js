'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const parameterModel = db.admin.parameters;

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
				{ param_key: seq.where(seq.fn('LOWER', seq.col('param_key')), 'LIKE', '%' + filter + '%') },
				{ param_value: seq.where(seq.fn('LOWER', seq.col('param_value')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await parameterModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ADMINISTRACION :: PARAMETROS');
		} catch (error) {
			db.setEmpty(res,'ADMINISTRACION :: PARAMETROS',false,error);
		}

	},

	/*
	 * ACTUALIZAR REGISTROS
	 */
	updateEntity(req, res){

		// ACTUALIZAR DATOS DE LOCAL
		parameterModel.update(
			{
				param_value: JSON.stringify(req.body.data)
			},
			{ where: { param_id: req.body.entityId } }
		).then(data => {

			res.status(200).json({
				estado: true,
				data: data,
				mensaje: '¡ACTUALIZACIÓN DE DATOS COMPLETADA CON ÉXITO!'
			});

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });

	}

};