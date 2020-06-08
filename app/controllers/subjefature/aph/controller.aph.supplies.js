'use strict';
const { dateFormat, now, format } = require('../../../config/parseDate');
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.aphSupplies;

const userModel = db.users;
const staffModel = db.staff;
const personModel = db.persons;

module.exports = {

	/**
	 * @function nuevo registro
	*/
	async newEntity(req, res){
		try {
			// FORMULARIO DE FRONT-END
			let data = req.body;
			// CONSULTAR SI EXISTE EL REGISTRO
			let user = await userModel.findByPk(data.userId);
			let staff = await staffModel.findOne({ where: { fk_persona_id : user.fk_persona_id } })
			// VALIDAR SI EL USUARIO TIENE ROLES COMO PERSONAL
			if(!staff) return db.endConection(res,next,'NO SE HA COMPLETAR ESTA OPERACIÓN, FAVOR VUELVA A INTENTAR EN UNOS MINUTOS.');
			// DATOS DE ACTUALIZACIÓN
			data.fk_personal_id = staff.personal_id;

			// ACTUALIZAR MODELO
			await model.create( data );

			// RETORNAR CONSULTA
			db.setEmpty(res,'INGRESO CORRECTO',true);

		} catch (error) {
			db.setEmpty(res,'APH - INGRESO DE INSUMOS',false,error);
		}
	},

	/**
	 * @function nuevo registro
	*/
	async updateEntity(req, res, next){
		try {
			// FORMULARIO DE FRONT-END
			let data = req.body;
			// CONSULTAR SI EXISTE EL REGISTRO
			let user = await userModel.findByPk(data.userId);
			let staff = await staffModel.findOne({ where: { fk_persona_id : user.fk_persona_id } })
			// VALIDAR SI EL USUARIO TIENE ROLES COMO PERSONAL
			if(!staff) return db.endConection(res,next,'NO SE HA COMPLETAR ESTA OPERACIÓN, FAVOR VUELVA A INTENTAR EN UNOS MINUTOS.');
			// DATOS DE ACTUALIZACIÓN
			data.fk_personal_id = staff.personal_id;
			// data.insumo_registro = new Date();
			data.insumo_registro = dateFormat(now, format.dateTime);

			// ACTUALIZAR MODELO
			await model.update( data, { where: { insumo_id: data.insumo_id } } );

			// RETORNAR CONSULTA
			db.setEmpty(res,'ACTUALIZACIÓN CORRECTA',true);

		} catch (error) {
			db.setEmpty(res,'APH - ACTUALIZACIÓN DE INSUMOS',false,error);
		}
	},

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
					stationId: req.query.stationId,
					limit: limit,
					offset: offset,
					filter: '%' + filter + '%'
				},
				type: seq.QueryTypes.SELECT 
			};

			// STRING DE CONSULTA 
			const str = "SELECT * FROM subjefatura.vw_insumosaph_stock_estaciones WHERE bodegaId <> 9 AND estacionId = :stationId AND UPPER(sinacentos(insumo_nombre)) LIKE UPPER(sinacentos(:filter))";
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
	async paginationSuppliesStockWineries(req, res){
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
			const str = "SELECT * FROM subjefatura.vw_insumosaph_stock_estaciones WHERE bodegaId = :wineryId AND UPPER(sinacentos(insumo_nombre)) LIKE UPPER(sinacentos(:filter))";
			let rows = await seq.query(`${str} ORDER BY ${sortData} LIMIT :limit OFFSET :offset`,replacements);
			let count = await seq.query(`${str} ORDER BY ${sortData}`,replacements);

			const meta = paginate(currentPage, count.length, rows, pageLimit);

			// RETORNAR CONSULTA
			db.setDataTable(res,{ rows, meta },'APH - STOCK DE INSUMOS EN BODEGAS [ESTACIONES]',true);

		} catch (error) {
			db.setEmpty(res,'APH - STOCK DE INSUMOS EN BODEGAS [ESTACIONES]',false,error);
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
			const str = "SELECT * FROM subjefatura.vw_insumosaph_stock WHERE UPPER(sinacentos(insumo_nombre)) LIKE UPPER(sinacentos(:filter))";
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
			const where = seq.or(
				{ insumo_codigo: seq.where(seq.fn('LOWER', seq.col('insumo_codigo')), 'LIKE', '%' + filter + '%') },
				{ insumo_nombre: seq.where(seq.fn('LOWER', seq.col('insumo_nombre')), 'LIKE', '%' + filter + '%') },
				{ insumo_presentacion: seq.where(seq.fn('LOWER', seq.col('insumo_presentacion')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [ {
						model: staffModel, as: 'staff',
						attributes : ['personal_estado','personal_correo_institucional'],
						include: [ { 
							model: personModel, as: 'person',
							attributes: [ 'persona_apellidos', 'persona_nombres' ]
						} ]
					} ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'APH - LISTADO DE INSUMOS');
		} catch (error) {
			db.setEmpty(res,'APH - LISTADO DE INSUMOS',false,error);
		}

	}

};