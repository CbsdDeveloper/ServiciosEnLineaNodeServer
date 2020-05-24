'use strict';
const db = require('../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');


const permitModel = db.permitsLocals;
const selfInspectionMdl = db.selfInspections;

const userMdl = db.users;
const localMdl = db.locals;
const entityMdl = db.entities;

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
				{ codigo_per: seq.where(seq.fn('LOWER', seq.col('codigo_per')), 'LIKE', '%' + filter + '%') },

				{ local_nombrecomercial: seq.where(seq.fn('LOWER', seq.col('local_nombrecomercial')), 'LIKE', '%' + filter + '%') },
				{ entidad_razonsocial: seq.where(seq.fn('LOWER', seq.col('entidad_razonsocial')), 'LIKE', '%' + filter + '%') },
				{ entidad_ruc: seq.where(seq.fn('LOWER', seq.col('entidad_ruc')), 'LIKE', '%' + filter + '%') }
			);
			const { rows, count } = await permitModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: (filter != '')?where:{},
					order: [ sort ],
					include: [
						{
							model: selfInspectionMdl, as: 'selfInspection',
							attributes: [ 'autoinspeccion_id','autoinspeccion_codigo','autoinspeccion_fecha' ],
							include: [
								{
									model: localMdl, as: 'local',
									attributes: [ 'local_id','local_nombrecomercial' ],
									include: [
										{ 
											model: entityMdl, as: 'entity',
											attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc','entidad_contribuyente' ]
										}
									]
								}
							]
						},
						{ 
							model: userMdl, as: 'user',
							attributes: [ ['usuario_login','usuario'] ]
						} 
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'PERMISOS ANUALES DE FUNCIONAMIENTO');
		} catch (error) {
			db.setEmpty(res,'PERMISOS ANUALES DE FUNCIONAMIENTO',false,error);
		}

	},

	/*
	 * PERMISOS DE FUNCIONAMIENTO POR ID DE LOCAL
	 */
	async paginateByLocal(req, res){
		
		const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const { rows, count } = await permitModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					order: [ sort ],
					where: { '$selfInspection.local.local_id$': req.query.localId },
					include: [
						{
							model: selfInspectionMdl, as: 'selfInspection',
							attributes: [ 'autoinspeccion_id','autoinspeccion_codigo','autoinspeccion_fecha' ],
							include: [
								{
									model: localMdl, as: 'local',
									attributes: [ 'local_id','local_nombrecomercial' ],
									include: [
										{ 
											model: entityMdl, as: 'entity',
											attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc','entidad_contribuyente' ]
										}
									]
								}
							]
						},
						{ 
							model: userMdl, as: 'user',
							attributes: [ ['usuario_login','usuario'] ]
						} 
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'PERMISOS ANUALES DE FUNCIONAMIENTO');

	}

};
