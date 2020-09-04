'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.tthh.leaderships;

const userMdl = db.admin.users;

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
			const whr = {
				[Op.or]: [
					{ direccion_tipo: { [Op.iLike]: '%' + filter + '%'} },
					{ direccion_codigo: { [Op.iLike]: '%' + filter + '%'} },
					{ direccion_nombre: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await model.findAndCountAll({
				offset: offset,
				limit: limit,
				where: whr,
				order: [ sort ],
				include: [
					{
						model: model, as: 'leadership', 
						required: false, 
						attributes: []
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