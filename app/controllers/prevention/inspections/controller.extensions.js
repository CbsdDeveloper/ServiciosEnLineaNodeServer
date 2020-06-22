'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const extensionMdl = db.prevention.extensions;

const inspectionMdl = db.prevention.inspections;
const inspectionLocalMdl = db.prevention.inspectionLocal;
const inspectionInspectorMdl = db.prevention.inspectionInspector;

const localMdl = db.locals;
const personMdl = db.persons;
const entityMdl = db.entities;

const userMdl = db.users;
const ppersonalMdl = db.ppersonal;
const staffMdl = db.staff;

module.exports = {

	/*
	 * PERMISOS DE FUNCIONAMIENTO POR ID DE LOCAL
	 */
	async paginationEntity(req, res){
		
		const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
		const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
		const where = seq.or(
			{ prorroga_codigo: seq.where(seq.fn('LOWER', seq.col('prorroga_codigo')), 'LIKE', '%' + filter + '%') },
			{ prorroga_estado: seq.where(seq.fn('LOWER', seq.col('prorroga_estado')), 'LIKE', '%' + filter + '%') }
		);
		const { rows, count } = await extensionMdl.findAndCountAll({
			offset: offset,
			limit: limit,
			order: [ sort ],
			where: where,
			include: [
				{
					model: inspectionMdl, as: 'inspection',
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
						}
					]
				},
				{
					model: ppersonalMdl, as: 'authorize',
					attributes: [ 'ppersonal_estado' ],
					include: [
						{
							model: staffMdl, as: 'staff',
							attributes: [ 'personal_correo_institucional' ],
							include: [
								{
									model: personMdl, as: 'person',
									attributes: [ 'persona_apellidos','persona_nombres' ]
								}
							]
						}
					]
				},
				{
					model: personMdl, as: 'requested',
					attributes: [ 'persona_apellidos','persona_nombres' ]
				},
				{
					model: userMdl, as: 'user',
					attributes: [ ['usuario_login','usuario'] ]
				}
			]
		});
		const meta = paginate(currentPage, count, rows, pageLimit);
		db.setDataTable(res,{ rows, meta },'PRORROGAS A LOCALES COMERCIALES');

	},

	/*
	 * INSPECCIONES DE UN ESTABLECIMIENTO
	 */
	async findByLocalId(req, res){
		// CONSULTA DE MODELOS
		const data = await extensionMdl.findAll({
			include: [
				{
					model: inspectionMdl, as: 'inspection',
					required: true,
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
					]
				},
				{
					model: ppersonalMdl, as: 'authorize',
					attributes: [ 'ppersonal_estado' ],
					include: [
						{
							model: staffMdl, as: 'staff',
							attributes: [ 'personal_correo_institucional' ],
							include: [
								{
									model: personMdl, as: 'person',
									attributes: [ 'persona_apellidos','persona_nombres' ]
								}
							]
						}
					]
				},
				{
					model: personMdl, as: 'requested',
					attributes: [ 'persona_apellidos','persona_nombres' ]
				},
				{
					model: userMdl, as: 'user',
					attributes: [ ['usuario_login','usuario'] ]
				}
			],
			order: [ [ 'prorroga_codigo','DESC' ] ]
		});
		// RETORNAR CONSULTA
		db.setEmpty(res,'PRORROGAS DE UN LOCAL',true,data);
	}


}