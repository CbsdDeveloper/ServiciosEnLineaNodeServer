'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const selfInspectionModel = db.permits.selfInspections;

const localMdl = db.permits.locals;
const entityMdl = db.permits.entities;

const personMdl = db.resources.persons;

// VARIABLES GLOBALES
var strWhr;

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
				// { autoinspeccion_fecha: seq.where(seq.fn('LOWER', seq.col('autoinspeccion_fecha')), 'LIKE', '%' + filter + '%') },
				{ autoinspeccion_codigo: seq.where(seq.fn('LOWER', seq.col('autoinspeccion_codigo')), 'LIKE', '%' + filter + '%') },
				{ entidad_ruc: seq.where(seq.fn('LOWER', seq.col('entidad_ruc')), 'LIKE', '%' + filter + '%') },
				{ entidad_razonsocial: seq.where(seq.fn('LOWER', seq.col('entidad_razonsocial')), 'LIKE', '%' + filter + '%') },
				{ local_nombrecomercial: seq.where(seq.fn('LOWER', seq.col('local_nombrecomercial')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await selfInspectionModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{
							model: localMdl, as: 'local',
							attributes: [ 'local_id','local_nombrecomercial' ],
							include: [
								{ 
									model: entityMdl, as: 'entity',
									attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc' ]
								}
							]
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ENTIDADES COMERCIALES');
		} catch (error) {
			db.setEmpty(res,'ENTIDADES COMERCIALES',false,error);
		}

	},

	/*
	 * ENCONTRAR REGISTRO POR ID DE LOCAL
	 */
	async findBySelfInspectionId(req, res){
		
		try {
			
			// CONSULTAR AUTOINSPECCION
			let selfInspection = await selfInspectionModel.findOne({ where: { autoinspeccion_codigo: req.body.code } });
			// CONSULTAR LOCAL
			let local = await localMdl.findByPk(selfInspection.fk_local_id);

			// CONSULTA DE PLANES
			let data = await entityMdl.findOne({
				where: { entidad_id: local.fk_entidad_id },
				include: [
					{ 
						model: personMdl, as: 'person',
						attributes: [ 'persona_doc_identidad','persona_tipo_doc','persona_apellidos','persona_nombres','persona_correo','persona_telefono','persona_celular','persona_imagen','persona_anexo_cedula' ]
					 },
					{ 
						model: personMdl, as: 'adopted', 
						attributes: [ 'persona_doc_identidad','persona_tipo_doc','persona_apellidos','persona_nombres','persona_correo','persona_telefono','persona_celular','persona_imagen','persona_anexo_cedula' ],
						required: false 
					}
				]
			});

			// RETORNAR LISTADO
			db.setEmpty(res,'INFORMACION DE UNA ENTIDAD - BY CODIGO PER',true,data);

		} catch (error) {
			db.setEmpty(res,'DETALLE DE ENTIDAD - PERMISOS POR CODIGO_PER',false,error);
		}	
	},

};
