'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');
const { resources } = require('../../../models');

const transportModel = db.prevention.tglp;
const transportInspectorMdl = db.prevention.tglpInspector;
const transportResourceMdl = db.prevention.tglpResources;

const permitMdl = db.permits.permitsLocals;
const selfInspectionMdl = db.permits.selfInspections;
const localMdl = db.permits.locals;
const entityMdl = db.permits.entities;

const ppersonalMdl = db.tthh.ppersonal;
const staffMdl = db.tthh.staff;
const jobMdl = db.tthh.jobs;
const leadershipMdl = db.tthh.leaderships;

const vehicleMdl = db.resources.vehicles;
const personMdl = db.resources.persons;
const userMdl = db.admin.users;

const resourcesMdl = db.resources.resources;

module.exports = {

	/*
	 * PERMISOS DE FUNCIONAMIENTO POR ID DE LOCAL
	 */
	async paginationEntity(req, res){
		
		const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
		const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
		const whr = {
			[Op.or]: [
				{ transporte_codigo: { [Op.iLike]: '%' + filter + '%'} },
				seq.literal("transporte_aprobado::text like '%" + filter + "%'"),

				{ '$vehicle.vehiculo_placa$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$vehicle.vehiculo_chasis$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$vehicle.vehiculo_motor$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$vehicle.owner.persona_apellidos$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$vehicle.owner.persona_nombres$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$vehicle.owner.persona_doc_identidad$': { [Op.iLike]: '%' + filter + '%'} },

				{ '$permit.codigo_per$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$permit.selfInspection.local.local_nombrecomercial$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$permit.selfInspection.local.entity.entidad_ruc$': { [Op.iLike]: '%' + filter + '%'} },
				{ '$permit.selfInspection.local.entity.entidad_razonsocial$': { [Op.iLike]: '%' + filter + '%'} }
			]
		};
		const { rows, count } = await transportModel.findAndCountAll({
			offset: offset,
			limit: limit,
			order: [ sort ],
			where: whr,
			attributes: {
				include: [
					[ seq.literal("date_part('year',permit.permiso_fecha)=date_part('year',CURRENT_DATE)"), 'current' ]
				],
			},
			include: [
				{
					model: permitMdl, as: 'permit',
					attributes: [ 'permiso_id','permiso_fecha','codigo_per' ],
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
						}
					]
				},
				{
					model: vehicleMdl, as: 'vehicle',
					include: [
						{
							model: personMdl, as: 'owner',
							attributes: [ 'persona_doc_identidad','persona_apellidos','persona_nombres','persona_tipo_doc' ]
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
		db.setDataTable(res,{ rows, meta },'PERMISOS DE TRANSPORTE DE COMBUSTIBLE');

	},

	/*
	 * INSPECCIONES DE UN ESTABLECIMIENTO
	 */
	async findById(req, res){
		// CONSULTA DE MODELOS
		const data = await transportModel.findOne({
			where: { transporte_id: req.body.transportId },
			include: [
				{
					model: permitMdl, as: 'permit',
					attributes: [ 'permiso_id','permiso_fecha','codigo_per','permiso_numero','numero_solicitud','observacion' ],
					include: [
						{
							model: selfInspectionMdl, as: 'selfInspection',
							attributes: [ 'autoinspeccion_id','autoinspeccion_codigo','autoinspeccion_fecha' ],
							include: [
								{
									model: localMdl, as: 'local',
									attributes: [ 'local_id','local_nombrecomercial','local_principal','local_secundaria','local_referencia','local_parroquia','local_medidor','local_telefono','local_fecha_registro' ],
									include: [
										{ 
											model: entityMdl, as: 'entity',
											attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc','entidad_contribuyente' ]
										}
									]
								}
							]
						}
					]
				},
				{
					model: vehicleMdl, as: 'vehicle',
					include: [
						{
							model: personMdl, as: 'owner',
							attributes: [ 'persona_doc_identidad','persona_apellidos','persona_nombres','persona_tipo_doc' ]
						}
					]
				},
				{
					model: transportInspectorMdl, as: 'inspectors',
					include: [
						{
							model: ppersonalMdl, as: 'ppersonal',
							attributes: [ 'ppersonal_estado','personal_fecha_ingreso' ],
							include: [
								{
									model: staffMdl, as: 'staff',
									attributes: [ 'personal_correo_institucional' ],
									include: [
										{
											model: personMdl, as: 'person',
											attributes: [ 'persona_apellidos','persona_nombres','persona_imagen','persona_doc_identidad' ]
										}
									]
								},
								{
									model: jobMdl, as: 'job',
									attributes: [ 'puesto_nombre' ],
									include: [
										{
											model: leadershipMdl, as: 'leadership',
											attributes: [ 'direccion_nombre' ]
										}
									]
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
		// RETORNAR CONSULTA
		db.setEmpty(res,'DETALLE DE PERMISO DE TRANSPORTE DE COMBUSTIBLE',true,data);
	},

	/*
	 * INSPECCIONES DE UN ESTABLECIMIENTO
	 */
	async reviewById(req, res){
		// CONSULTA DE MODELOS
		let data = await transportModel.findOne({
			where: { transporte_id: req.body.transportId },
			include: [
				{
					model: permitMdl, as: 'permit',
					attributes: [ 'permiso_id','permiso_fecha','codigo_per','permiso_numero','numero_solicitud','observacion' ],
					include: [
						{
							model: selfInspectionMdl, as: 'selfInspection',
							attributes: [ 'autoinspeccion_id','autoinspeccion_codigo','autoinspeccion_fecha' ],
							include: [
								{
									model: localMdl, as: 'local',
									attributes: [ 'local_id','local_nombrecomercial','local_principal','local_secundaria','local_referencia','local_parroquia','local_medidor','local_telefono','local_fecha_registro' ],
									include: [
										{ 
											model: entityMdl, as: 'entity',
											attributes: [ 'entidad_id','entidad_razonsocial','entidad_ruc','entidad_contribuyente' ]
										}
									]
								}
							]
						}
					]
				},
				{
					model: vehicleMdl, as: 'vehicle',
					include: [
						{
							model: personMdl, as: 'owner',
							attributes: [ 'persona_doc_identidad','persona_apellidos','persona_nombres','persona_tipo_doc' ]
						}
					]
				}
			]
		});

		// MODELOS PARA FORMULARIO
		let model = {};
		let resources = {};
		
		// CONSULTAR RECURSOS GLP
		const rsc = await resourcesMdl.findAll({ 
			where: {
				[Op.and]: {
					transporteglp: 'SI', 
					recurso_estado: 'ACTIVO'
				}
			}
		});
		rsc.forEach((v, k) => {
			// LISTA DE REQUISITOS
			resources[v.recurso_id]=v;
			// CARGAR REQUISITO PARA REVISION
			model[v.recurso_id]={
				'fk_transporte_id': req.body.transportId,
				'fk_recurso_id': v.recurso_id,
				'recurso_estado': 'SI'
			};
		});
		
		// CONSULTAR RECURSOS GLP
		const list = await transportResourceMdl.findAll({ 
			where: { fk_transporte_id: req.body.transportId }
		});
		list.forEach((v, k) => {
			// LISTA DE REQUISITOS
			model[v.fk_recurso_id]=v;
		});

		// RETORNAR CONSULTA
		db.setEmpty(res,'DETALLE DE PERMISO DE TRANSPORTE DE COMBUSTIBLE',true,{ data, model, resources });
	}

}