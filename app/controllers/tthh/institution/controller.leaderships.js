'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.leaderships;

const userMdl = db.users;

module.exports = {

	// LISTADO DE DIRECCIONES
	findAll(req, res){
		model.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE DIRECCIONES');
		}).catch(err => { db.setEmpty(res,'error',false,error); });
	},

	// LISTADO DE DIRECCIONES - DIRECCION
	findAllLeaderships(req, res){
		model.findAll({
			where: {
				direccion_tipo: 'DIRECCION'
			}
		}).then(data => {
			db.setJSON(res,data,'LISTADO DE DIRECCIONES');
		}).catch(err => { db.setEmpty(res,'error',false,error); });
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
			const where = seq.or(
				{ direccion_tipo: seq.where(seq.fn('LOWER', seq.col('direccion_tipo')), 'LIKE', '%' + filter + '%') },
				{ direccion_codigo: seq.where(seq.fn('LOWER', seq.col('direccion_codigo')), 'LIKE', '%' + filter + '%') },
				{ direccion_nombre: seq.where(seq.fn('LOWER', seq.col('direccion_nombre')), 'LIKE', '%' + filter + '%') },
				{ direccion_baselegal: seq.where(seq.fn('LOWER', seq.col('direccion_baselegal')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{
							model: model, as: 'leadership', required: false, attributes: []
						},
						{
							model: userMdl, as: 'user',
							attributes: [ ['usuario_login','usuario'] ]
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'TTHH - LISTADO DE DIRECCIONES');

		} catch (error) { db.setEmpty(res,'TTHH - LISTADO DE DIRECCIONES',false,error); }

	}

};