'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const typeAdvances = db.typeAdvances;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'tanticipo_nombre' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				cuenta_codigo: seq.where(seq.fn('LOWER', seq.col('tanticipo_nombre')), 'LIKE', '%' + filter + '%')
			};
			const { rows, count } = await typeAdvances.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'TIPOS DE ANTICIPOS');
		} catch (error) {
			db.setEmpty(res,'TIPOS DE ANTICIPOS',false,error);
		}

	},

	/*
	 * LISTAR MODELOS
	 */
	async listEntity(req, res){
		// LISTAR MODELOS
		typeAdvances.findAll().then(data => {
			// RETORNAR CONSULTA
			db.setJSON(res,data,'LISTADO DE MODELOS',data);
		});
	},

	/*
	 * ACTUALIZACIÓN DE MODELOS
	 */
	async updateEntity(req, res){
		try {

			// ACTUALIZAR DATOS DE MODELO
			req.body.tanticipo_registro = db.getCurrentDate();
			// ACTUALIZAR MODELO
			typeAdvances.update(req.body,{
				where: { tanticipo_id: req.body.tanticipo_id }
			}).then(model => {
				// RETORNAR CONSULTA
				db.setEmpty(res,'DATOS ACTUALIZADOS CORRECTAMENTE',true,model);
			});

		} catch (error) {
			db.setEmpty(res,'ERROR EN MODELO',false,error);
		}

	}

};