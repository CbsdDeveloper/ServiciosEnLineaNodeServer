'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.stations;

const userMdl = db.users;

module.exports = {

	// LISTADO DE ESTACIONES
	findAll(req, res){
		model.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE ESTACIONES');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// ESTACIONES POR ID
	findById(req, res){	
		model.findById(req.params.id).then(data => {
			db.setJSON(res,data,'ESTACION POR ID');
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
			const where = seq.or(
				{ estacion_nombre: seq.where(seq.fn('LOWER', seq.col('estacion_nombre')), 'LIKE', '%' + filter + '%') },
				{ estacion_nombre_alterno: seq.where(seq.fn('LOWER', seq.col('estacion_nombre_alterno')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
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