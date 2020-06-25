'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const entityModel = db.permits.entities;
const partner = db.resources.persons;
const userMdl = db.admin.users;

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
			const where = seq.or(
				{ entidad_razonsocial: seq.where(seq.fn('LOWER', seq.col('entidad_razonsocial')), 'LIKE', '%' + filter + '%') },
				{ entidad_ruc: seq.where(seq.fn('LOWER', seq.col('entidad_ruc')), 'LIKE', '%' + filter + '%') },
				{ persona_doc_identidad: seq.where(seq.fn('LOWER', seq.col('persona_doc_identidad')), 'LIKE', '%' + filter + '%') },
				{ persona_apellidos: seq.where(seq.fn('LOWER', seq.col('persona_apellidos')), 'LIKE', '%' + filter + '%') },
				{ persona_nombres: seq.where(seq.fn('LOWER', seq.col('persona_nombres')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await entityModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [ 
						{ 
							model: partner, as: 'person',
							attributes: [ 'persona_id','persona_doc_identidad','persona_tipo_doc','persona_apellidos','persona_nombres','persona_correo' ]
						},
						{ 
							model: userMdl, as: 'user',
							attributes: [ ['usuario_login','usuario'] ]
						} 
					]
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
			where: { entidad_id: req.body.entityId },
			include: [
				{ model: partner, as: 'person' }
			]
		}).then(data => {
			db.setEmpty(res,'ENTIDAD POR ID',true,data);
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

	/*
	 * DATOS - SESSION DE ENTIDAD
	 */
	getSummaryByEntity(req, res){
		// CONDICIONALES DE BUSQUEDA
		var filterParams = { 
			replacements: req.body, 
			type: seq.QueryTypes.SELECT
		};

		// CONSULTAR ACTIVIDADES ECONOMICAS
		seq.query("SELECT * FROM prevencion.vw_resumen_entidad WHERE entidad_id = :tokenId", filterParams).then(function (summary) {

			// RETORNAR LISTADO
			res.status(200).json({
				estado: true,
				mensaje: 'RESUMEN DE ENTIDAD',
				data: summary[0]
			});

		}).catch(err => { res.status(500).json({msg: "error", details: err}); });
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