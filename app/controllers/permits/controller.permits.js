'use strict';
const db = require('../../models');
const seq = db.sequelize;
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');


const permitModel = db.permits.permitsLocals;
const selfInspectionMdl = db.permits.selfInspections;

const duplicatedMdl = db.permits.duplicates;

const userMdl = db.admin.users;
const localMdl = db.permits.locals;
const entityMdl = db.permits.entities;

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
			const where = {
				[Op.or]: [
					{ 'codigo_per': { [Op.iLike]: '%' + filter + '%'} },

					{ '$selfInspection.local.local_nombrecomercial$': { [Op.iLike]: '%' + filter + '%'} },
					
					seq.literal("permiso_fecha::text like '%" + filter + "%'"),

					{ '$selfInspection.local.entity.entidad_razonsocial$': { [Op.iLike]: '%' + filter + '%'} },
					{ '$selfInspection.local.entity.entidad_ruc$': { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await permitModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					where: where,
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
						},
						{
							model: duplicatedMdl, as: 'duplicates',
							attributes: [ 'duplicado_estado' ],
							required: false,
							where: {
								duplicado_estado: ['APROBADO','PENDIENTE']
							},
							limit: 1,
							order: [ [ 'duplicado_id','DESC' ] ] 
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

	},

	/*
	 * ENCONTRAR REGISTRO POR ID DE LOCAL
	 */
	async findByLocalId(req, res){
		// CONSULTA DE PLANES
		let data = await permitModel.findAll({
			include: [
				{
					model: selfInspectionMdl, as: 'selfInspection',
					attributes: [ 'autoinspeccion_id','autoinspeccion_codigo','autoinspeccion_fecha' ],
					where: { fk_local_id: req.body.localId },
					required: true
				},
				{
					model: userMdl, as: 'user',
					attributes: [ [ 'usuario_login','usuario' ] ]
				}
			],
			order: [ [ 'permiso_fecha','DESC' ] ]
		})
		// RETORNAR LISTADO
		db.setEmpty(res,'PERMISOS DE FUNCIONAMIENTO DE UN LOCAL',true,data);	
	},

	/*
	 * ENCONTRAR REGISTRO POR ID DE LOCAL
	 */
	async findBySelfInspectionId(req, res){
		
		try {
			// CONSULTAR AUTOINSPECCION
			let selfInspection = await selfInspectionMdl.findOne({ where: { autoinspeccion_codigo: req.body.code } });
			// CONSULTA DE PLANES
			let data = await permitModel.findAll({
				include: [
					{
						model: selfInspectionMdl, as: 'selfInspection',
						attributes: [ 'autoinspeccion_id','autoinspeccion_codigo','autoinspeccion_fecha' ],
						where: { fk_local_id: selfInspection.fk_local_id },
						required: true
					},
					{
						model: userMdl, as: 'user',
						attributes: [ [ 'usuario_login','usuario' ] ]
					}
				],
				order: [ [ 'permiso_fecha','DESC' ] ]
			});
			// RETORNAR LISTADO
			db.setEmpty(res,'PERMISOS DE FUNCIONAMIENTO DE UN LOCAL',true,data);

		} catch (error) {
			db.setEmpty(res,'DETALLE DE ENTIDAD - PERMISOS POR CODIGO_PER',false,error);
		}	
	},

};
