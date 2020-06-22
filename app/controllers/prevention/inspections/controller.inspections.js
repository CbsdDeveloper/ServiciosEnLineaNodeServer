'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const inspectionModel = db.prevention.inspections;
const inspectionLocalMdl = db.prevention.inspectionLocal;
const inspectionInspectorMdl = db.prevention.inspectionInspector;

const localMdl = db.locals;
const personMdl = db.persons;
const entityMdl = db.entities;

const userMdl = db.users;

module.exports = {

	/*
	 * PERMISOS DE FUNCIONAMIENTO POR ID DE LOCAL
	 */
	async paginationEntity(req, res){
		
		const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
		const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
		const where = seq.or(
			{ inspeccion_codigo: seq.where(seq.fn('LOWER', seq.col('inspeccion_codigo')), 'LIKE', '%' + filter + '%') },
			{ inspeccion_estado: seq.where(seq.fn('LOWER', seq.col('inspeccion_estado')), 'LIKE', '%' + filter + '%') },
			{ inspeccion_informe_numero: seq.where(seq.fn('LOWER', seq.col('inspeccion_informe_numero')), 'LIKE', '%' + filter + '%') }
		);
		const { rows, count } = await inspectionModel.findAndCountAll(
			{
				offset: offset,
				limit: limit,
				order: [ sort ],
				where: where,
				include: [
					{
						model: inspectionLocalMdl, as: 'locals',
						include: [
							{
								model: localMdl, as: 'local',
								attributes: [ 'local_id','local_nombrecomercial','local_principal','local_secundaria','local_referencia','local_telefono','local_clavecatastral' ],	
								include: [
									{ 
										model: entityMdl, as: 'entity',
										attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc','entidad_contribuyente' ],
										include: [
											{ 
												model: personMdl, as: 'person',
												attributes: [ 'persona_id','persona_nombres','persona_apellidos','persona_doc_identidad' ]
											}
										]
									}
								]
							}
						]
					},
					{
						model: inspectionInspectorMdl, as: 'inspectors',
						include: [
							{
								model: userMdl, as: 'user',
								attributes: [ ['usuario_login','usuario'] ]
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