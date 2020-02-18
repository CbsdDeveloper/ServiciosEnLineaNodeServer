'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const typeContracts = db.typeContracts;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'tcontrato_nombre' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				tcontrato_nombre: seq.where(seq.fn('LOWER', seq.col('tcontrato_nombre')), 'LIKE', '%' + filter + '%')
			};
			const { rows, count } = await typeContracts.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'TIPOS DE CONTRATOS');
		} catch (error) {
			db.setEmpty(res,'TIPOS DE CONTRATOS',false,error);
		}

	},

	/*
	 * ACTUALIZACIÓN DE MODELOS
	 */
	async updateEntity(req, res){
		try {
			// ACTUALIZAR DATOS DE MODELO
			req.body.tcontrato_registro = db.getCurrentDate();
			// ACTUALIZAR MODELO
			typeContracts.update(req.body,{
				where: { tcontrato_id: req.body.tcontrato_id }
			}).then(model => {
				// RETORNAR CONSULTA
				db.setEmpty(res,'DATOS ACTUALIZADOS CORRECTAMENTE',true,model);
			});
		} catch (error) {
			db.setEmpty(res,'ERROR EN MODELO',false,error);
		}
	}

};