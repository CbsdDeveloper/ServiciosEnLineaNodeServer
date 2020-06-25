'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const resourceModel = db.resources.resources;

const userMdl = db.admin.users;

module.exports = {

	// ENCONTRAR REGISTRO POR ID
	findResourcesFactorsForPlans(req, res){
		// MODELO DE RETORNO
		model = {};
		// CONSULTAR REGISTROS
		resourceModel.findAll({
			where: { recurso_clasificacion: ['FACTORES INTERNOS','POSIBLE SOLUCIÓN A RIESGOS Y PELIGROS INTERNOS','FACTORES EXTERNOS','POSIBLE SOLUCIÓN A RIESGOS Y PELIGROS EXTERNOS'] }
		}).then(data => {
			// CLASIFICACION DE RECURSOS
			data.forEach((v, k) => {
				// CREAR MODELO SI NO EXISTE
				if(!model[v.recurso_clasificacion]) model[v.recurso_clasificacion]={};
				// INSERTAR RECURSO EN MODELO
				model[v.recurso_clasificacion][v.recurso_id] = v;
			});
			// RETORNAR LISTADO
			res.status(200).json({
				estado: true,
				mensaje: 'RECURSOS PARA PLANES DE AUTOPROTECCION',
				data: model
			});
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });	
	},

	// ENCONTRAR REGISTRO POR ID
	findResourcesPreventionForPlans(req, res){
		// MODELO DE RETORNO
		model = {};
		// CONSULTAR REGISTROS
		resourceModel.findAll({
			where: { recurso_clasificacion: ['PREVENCIÓN Y CONTROL DE RIESGOS'] }
		}).then(data => {
			// CLASIFICACION DE RECURSOS
			data.forEach((v, k) => {
				// CREAR MODELO SI NO EXISTE
				if(!model[v.recurso_clasificacion]) model[v.recurso_clasificacion]={};
				// INSERTAR RECURSO EN MODELO
				model[v.recurso_clasificacion][v.recurso_id] = v;
			});
			// RETORNAR LISTADO
			res.status(200).json({
				estado: true,
				mensaje: 'RECURSOS PARA PLANES DE AUTOPROTECCION',
				data: model
			});
		}).catch(err => { res.status(500).json({msg: "error", details: err}); });	
	},

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationRatingSystems(req, res){
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = seq.or(
				{ recurso_nombre: seq.where(seq.fn('LOWER', seq.col('recurso_nombre')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await resourceModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: {
						recurso_clasificacion: 'SISTEMA DE CALIFICACION PARA EVALUACIONES'
					},
					order: [ sort ],
					include: [
						{
							model: userMdl, as: 'user',
							attributes: [ [ 'usuario_login', 'usuario' ] ]
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'CLASIFICACION DE FORMULARIOS');
		} catch (error) {
			db.setEmpty(res,'CLASIFICACION DE FORMULARIOS',false,error);
		}

	},

	/**
	 * LISTADO DE RECURSOS - SISTEMAS DE CALIFICACION DE EVALUACIONES
	*/
	async getRatingsystem(req, res){
		let data = await resourceModel.findAll(
			{
				where: { recurso_clasificacion: 'SISTEMA DE CALIFICACION PARA EVALUACIONES' },
				order: [ ['recurso_nombre'] ]
			});
		db.setEmpty(res,'SISTEMA DE CALIFICACION PARA EVALUACIONES',true,data);
	}

}