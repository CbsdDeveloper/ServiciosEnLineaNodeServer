'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const model = db.aphSupplies;

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationSuppliesStockStations(req, res){
		try {
			
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);

			// PARAMETROS
			const replacements = { 
				replacements: {
					wineryId: req.query.wineryId,
					limit: limit,
					offset: offset,
					filter: '%' + filter + '%'
				},
				type: seq.QueryTypes.SELECT 
			};

			// STRING DE CONSULTA 
			const str = "SELECT * FROM tthh.vw_insumosaph_stock_estaciones WHERE bodegaId = :wineryId AND UPPER(sinacentos(insumo_nombre)) LIKE UPPER(sinacentos(:filter))";
			let rows = await seq.query(`${str} ORDER BY ${sortData} LIMIT :limit OFFSET :offset`,replacements);
			let count = await seq.query(`${str} ORDER BY ${sortData}`,replacements);

			const meta = paginate(currentPage, count.length, rows, pageLimit);

			// RETORNAR CONSULTA
			db.setDataTable(res,{ rows, meta },'APH - STOCK DE INSUMOS EN ESTACIONES',true);

		} catch (error) {
			db.setEmpty(res,'APH - STOCK DE INSUMOS EN ESTACIONES',false,error);
		}

	},

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationStockSupplies(req, res){
		try {
			
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);

			// PARAMETROS
			const replacements = { 
				replacements: {
					limit: limit,
					offset: offset,
					filter: '%' + filter + '%'
				},
				type: seq.QueryTypes.SELECT 
			};

			// STRING DE CONSULTA 
			const str = "SELECT * FROM tthh.vw_insumosaph_stock WHERE UPPER(sinacentos(insumo_nombre)) LIKE UPPER(sinacentos(:filter))";
			let rows = await seq.query(`${str} ORDER BY ${sortData} LIMIT :limit OFFSET :offset`,replacements);
			let count = await seq.query(`${str} ORDER BY ${sortData}`,replacements);

			const meta = paginate(currentPage, count.length, rows, pageLimit);

			// RETORNAR CONSULTA
			db.setDataTable(res,{ rows, meta },'APH - STOCK DE INSUMOS');

		} catch (error) {
			db.setEmpty(res,'APH - STOCK DE INSUMOS',false,error);
		}

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
					insumo_codigo: seq.where(seq.fn('LOWER', seq.col('insumo_codigo')), 'LIKE', '%' + filter + '%'),
					insumo_nombre: seq.where(seq.fn('LOWER', seq.col('insumo_nombre')), 'LIKE', '%' + filter + '%'),
					insumo_presentacion: seq.where(seq.fn('LOWER', seq.col('insumo_presentacion')), 'LIKE', '%' + filter + '%')
				}
			};
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'APH - LISTADO DE INSUMOS');
		} catch (error) {
			db.setEmpty(res,'APH - LISTADO DE INSUMOS',false,error);
		}

	}

};