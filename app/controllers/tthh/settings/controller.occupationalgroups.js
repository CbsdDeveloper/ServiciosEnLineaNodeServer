'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const occupationalgModel = db.tthh.occupationalgroups;

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
			const where = {
				grupo_nombre: seq.where(seq.fn('LOWER', seq.col('grupo_nombre')), 'LIKE', '%' + filter + '%')
			};
			const { rows, count } = await occupationalgModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'JORNADAS DE TRABAJO');
		} catch (error) {
			db.setEmpty(res,'JORNADAS DE TRABAJO',false,error);
		}

	},

	/*
	 * ACTUALIZACIÓN DE MODELOS
	 */
	async updateEntity(req, res){
		try {
			// ACTUALIZAR DATOS DE MODELO
			req.body.grupo_registro = db.getCurrentDate();
			// OBTENER REGISTRO
			let occupationalGroup = await occupationalgModel.findByPk(req.body.grupo_id);
			// ACTUALIZAR MODELO
			await occupationalGroup.update(req.body);
			
			// RETORNAR CONSULTA
			db.setEmpty(res,'DATOS ACTUALIZADOS CORRECTAMENTE',true,occupationalGroup);
			
		} catch (error) {
			db.setEmpty(res,'ERROR EN MODELO',false,error);
		}
	},

	// FETCH All Customers
	findAll(req, res){
		occupationalgModel.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE GRUPOS OCUPACIONALES');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}

};