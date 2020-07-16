'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const inspectionModel = db.prevention.inspections;
const inspectionLocalMdl = db.prevention.inspectionLocal;
const inspectionInspectorMdl = db.prevention.inspectionInspector;

const localMdl = db.permits.locals;
const entityMdl = db.permits.entities;

const userMdl = db.admin.users;

module.exports = {

	/*
	 * PERMISOS DE FUNCIONAMIENTO POR ID DE LOCAL
	 */
	async paginationEntity(req, res){
		
		const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
		const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
		const whr = {
			[Op.or]: [
				{ '$inspection.inspeccion_codigo$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$inspection.inspeccion_estado$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$inspection.inspeccion_informe_numero$': { [Op.iLike]: '%' + filter + '%'} },

				seq.literal("inspection.inspeccion_fecha_inspeccion::text like '%" + filter + "%'"),

				{ '$local.local_nombrecomercial$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$local.entity.entidad_ruc$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$local.entity.entidad_razonsocial$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$inspection.user.usuario_login$': { [Op.iLike]: '%' + filter + '%'} }
			]
		};
		const { rows, count } = await inspectionLocalMdl.findAndCountAll(
			{
				offset: offset,
				limit: limit,
				order: [ [ { model: inspectionModel, as: 'inspection' }, 'inspeccion_codigo', 'DESC' ] ],
				where: whr,
				distinct: true,
				include: [
					{
						model: localMdl, as: 'local',
						attributes: [ 'local_id','local_nombrecomercial','local_principal','local_secundaria','local_referencia','local_telefono','local_clavecatastral' ],	
						include: [
							{ 
								model: entityMdl, as: 'entity',
								attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc','entidad_contribuyente' ]
							}
						]
					},
					{
						model: inspectionModel, as: 'inspection',
						include: [
							{
								model: userMdl, as: 'user',
								attributes: [ ['usuario_login','usuario'] ]
							}
						]
					}
				]
			});
		const meta = paginate(currentPage, count, rows, pageLimit);
		db.setDataTable(res,{ rows, meta },'INSPECCIONES A LOCALES COMERCIALES');

	},

	/*
	 * INSPECCIONES DE UN ESTABLECIMIENTO
	 */
	async findByLocalId(req, res){
		// CONSULTA DE MODELOS
		const data = await inspectionModel.findAll({
			include: [
				{
					model: inspectionLocalMdl, as: 'locals',
					required: true,
					where: { fk_local_id: req.body.localId }
				},
				{
					model: inspectionInspectorMdl, as: 'inspectors',
					include: [
						{
							model: userMdl, as: 'user',
							attributes: [ ['usuario_login','usuario'] ]
						}
					]
				}
			],
			order: [ [ 'inspeccion_codigo','DESC' ] ]
		});
		// RETORNAR CONSULTA
		db.setEmpty(res,'INSPECCIONES DE UN LOCAL',true,data);
	}

}