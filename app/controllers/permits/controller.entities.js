'use strict';
const db = require('../../models');
const entityModel = db.entities;
const partner = db.persons;
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

module.exports = {

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntity(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData = 'entidad_razonsocial' } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				$or: {
					entidad_razonsocial: seq.where(seq.fn('LOWER', seq.col('entidad_razonsocial')), 'LIKE', '%' + filter + '%'),
					entidad_ruc: seq.where(seq.fn('LOWER', seq.col('entidad_ruc')), 'LIKE', '%' + filter + '%')
				}
			};
			const { rows, count } = await entityModel.findAndCountAll(
				{
					include: [ { model: partner, as: 'person' } ],
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ENTIDADES COMERCIALES');
		} catch (error) {
			db.setEmpty(res,'ENTIDADES COMERCIALES',false,error);
		}

	},

	// FETCH All Customers
	findAll(req, res){
		entityModel.findAll().then(data => {
			db.setJSON(res,data,'LISTADO DE ENTIDADES');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// Find a Customer by Id
	findById(req, res){	
		entityModel.findOne({
			where: { entidad_id: req.body.id },
			include: [
				{ model: partner, as: 'person' }
			]
		}).then(data => {
			db.setJSON(res,data,'ENTIDAD POR ID');
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	},

	// Find a Customer by Id
	findByRUC(req, res){
		// CONDICIONALES DE BUSQUEDA
		var strWhr = { entidad_ruc: req.body.ruc }
		// CONSULTAR REGISTROS
		entityModel.count({
			where: strWhr
		}).then(c => {
			// VALIDAR CONSULTA
			if( c > 0 ){
				entityModel.findOne({
					where: strWhr,
					include: [
						{ model: partner, as: 'person' }
					]
				}).then(data => {
					db.setEmpty(res,'ENTIDAD POR RUC',true,data);
				}).catch(err => { res.status(500).json({msg: "error", details: err}); });
			}else{
				db.setEmpty(res,'¡No se ha encontrado ningún registro asociado a este dato!',false);
			}
		});
	},

	// Find a Customer by Id
	findByEntity(req, res){
		// CONDICIONALES DE BUSQUEDA
		var strWhr = { entidad_ruc: req.params.entityRuc}
		var filterParams = { 
			replacements: req.params, 
			type: seq.QueryTypes.SELECT
		};
		// CONSULTAR REGISTROS
		entityModel.count({
			where: strWhr
		}).then(c => {
			// VALIDAR CONSULTA
			if( c > 0 ){
				entityModel.findOne({
					where: strWhr,
					include:[
						{ model: partner, as: 'person' }
					]
				}).then(data => {

					// CONSULTAR ACTIVIDADES ECONOMICAS
					seq.query("SELECT * FROM permisos.vw_locales WHERE UPPER(entidad_ruc) = UPPER(:entityRuc)", filterParams).then(function (locals) {

						// RETORNAR LISTADO
						res.status(200).json({
							estado: true,
							mensaje: 'ENTIDAD POR RUC',
							data: {
								locals: locals,
								entity: data
							}
						});

					}).catch(err => { res.status(500).json({msg: "error", details: err}); });
					
				}).catch(err => { res.status(500).json({msg: "error", details: err}); });
			}else{
				db.setJSON(res,[],'NO SE HA ENCONTRADO EL REGISTRO => entityModel->findByEntity');
			}
		});
	},

	// Find a Customer by Id
	summaryByRuc(req, res){
		// CONDICIONALES DE BUSQUEDA
		var filterParams = { 
			replacements: req.params, 
			type: seq.QueryTypes.SELECT
		};

		// CONSULTAR ACTIVIDADES ECONOMICAS
		seq.query("SELECT * FROM prevencion.vw_resumen_entidad WHERE UPPER(entidad_ruc) = UPPER(:entityRuc)", filterParams).then(function (summary) {

			// RETORNAR LISTADO
			res.status(200).json({
				estado: true,
				mensaje: 'RESUMEN DE ENTIDAD',
				data: summary[0]
			});

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
	}

};