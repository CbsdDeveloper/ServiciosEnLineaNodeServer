'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const model = db.subjefature.aphSupplyMovements;
const inventory = db.subjefature.aphSupplycontrol;
const supplies = db.subjefature.aphSupplies;

module.exports = {

	/*
	 * INGRESO DE INSUMOS
	 */
	async insertInventory(req, res, next){

		try {

			// REGISTRO DE FORMULARIO
			let inventoryData = req.body;

			const replacements = { 
				replacements: { supplyId: inventoryData.fk_insumo_id, inventoryId: inventoryData.fk_inventario_id },
				type: seq.QueryTypes.SELECT
			};

			// VALIDAR SI SE HA CARGADO EL REGISTRO
			if( parseInt(inventoryData.movimiento_cantidad)==0 ) return db.endConection(res,next,'NO SE HA INGRESADO NINGUN REGISTRO');
			
			// VALIDAR SI SE ESTÁ DEVOLVIENDO EL INGRESO DE UNA ESTACIÓN A LA BODEGA
			if( parseInt(inventoryData.movimiento_cantidad)<0 ){
				// CONSULTAR EXISTENCIA DE INSUMO EN INVENTARIO
				let currentInventory = await seq.query("SELECT * FROM subjefatura.vw_stock_inventarioaph WHERE fk_inventario_id = :inventoryId AND fk_insumo_id = :supplyId", replacements);
				// VALIDAR SI EXISTEN REGISTROS PREVIOS
				if( !( currentInventory[0] && parseInt(currentInventory[0].stock) >= parseInt(inventoryData.movimiento_cantidad) ) ) return db.endConection(res,next,'NO ES POSIBLE DEVOLVER UNA CANTIDAD QUE NO CUENTA EN STOCK.');
			}

			// CONSULTAR STOCK DE BODEGA CENTRAL
			let supplyStock = await seq.query("SELECT * FROM subjefatura.vw_stock_insumosaph WHERE insumoId = :supplyId", replacements);

			// VALIDAR SI LA TRANSACCION ES DE EGRESO
			if( parseInt(supplyStock[0].stocktotal)>=parseInt(inventoryData.movimiento_cantidad) ){

				// TRANSACCION
				inventoryData.movimiento_transaccion = (inventoryData.movimiento_cantidad>0)?'INGRESO':'DESCARGO';
				
				// INGRESAR REGISTRO
				model.create( inventoryData ).then(inventory => {
					return db.endConection(res,next,inventoryData.movimiento_transaccion + ' REGISTRADO CON EXITO!',true);
				});
				
			} else return db.endConection(res,next,'NO SE PUEDE HACER EL DESCARGO DE ESTA CANTIDAD, NO HAY EN STOCK.');

		} catch (error) {
			db.setEmpty(res,'ERROR OCASIONADO EN LA TRANSACCIÓN.',false);
			throw error
		};

	},

	/*
	 * LISTADO DE INSUMOS PARA CARGAR EN INVENTARIO
	 */
	async suppliesByInventoryId(req, res){

		const replacements = { 
			replacements: { inventoryId: req.body.inventoryId },
			type: seq.QueryTypes.SELECT
		};
		
		let tempModel = {}, auxModel = {};

		let inventoryData = await inventory.findByPk(req.body.inventoryId);

		let suppliesList = await supplies.findAll({ where: { insumo_estado: 'ACTIVO' } });
		suppliesList.forEach((v, k) => {
			tempModel[v.insumo_id] = {
				fk_insumo_id: v.insumo_id,
				insumo_codigo: v.insumo_codigo,
				insumo_presentacion: v.insumo_presentacion,
				insumo_concentracion: v.insumo_concentracion,
				insumo_nombre: v.insumo_nombre,
				stock: 0,
				movimiento_cantidad: 0
			};
		});

		let stockList = await seq.query("SELECT * FROM subjefatura.vw_stock_insumosaph", replacements);
		stockList.forEach((v, k) => { auxModel[v.insumoid] = parseInt(v.stocktotal); });

		let suppliesMovements = await seq.query("SELECT * FROM subjefatura.vw_stock_inventarioaph WHERE fk_inventario_id = :inventoryId", replacements);
		suppliesMovements.forEach((v, k) => { tempModel[v.fk_insumo_id].stock = (tempModel[v.fk_insumo_id]) ? parseInt(v.stock) : 0; });

		let data = {
			inventory: inventoryData,
			suppliesList: tempModel,
			stockList: auxModel
		};
			
		db.setEmpty(res,'LISTADO DE INSUMOS PARA INVENTARIO',true,data);

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
				{ movimiento_transaccion: seq.where(seq.fn('LOWER', seq.col('movimiento_transaccion')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await model.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'APH - MOVIMIENTO DE INSUMOS EN INVENTARIO');
		} catch (error) {
			db.setEmpty(res,'APH - MOVIMIENTO DE INSUMOS EN INVENTARIO',false,error);
		}

	}

};