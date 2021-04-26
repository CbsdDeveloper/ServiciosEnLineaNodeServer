'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const inspectionModel = db.tthh.fextinguisher.inspections;

const stationMdl = db.tthh.stations;

const ppersonalMdl = db.tthh.ppersonal;
const staffMdl = db.tthh.staff;
const jobMdl = db.tthh.jobs;
const personMdl = db.resources.persons;

module.exports ={

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
					{ inspeccion_codigo: { [Op.iLike]: '%' + filter + '%'} },
				]
			};

			const { rows, count } = await inspectionModel.findAndCountAll(
				{
					where: where,
					include: [
						{
							model: ppersonalMdl, as: 'registre', 
							attributes: [ 'ppersonal_id' ],
							include: [
								{
									model: staffMdl, as: 'staff', 
									attributes: [ 'personal_id','personal_correo_institucional' ],
									include: [
										{
											model: personMdl, as: 'person', 
											attributes: [ 'persona_apellidos','persona_nombres' ] 
										}
									]
								},
								{
									model: jobMdl, as: 'job', 
									attributes: [ 'puesto_id','puesto_nombre' ]
								}
							]
						},
						{
							model: ppersonalMdl, as: 'sos', 
							attributes: [ 'ppersonal_id' ],
							include: [
								{
									model: staffMdl, as: 'staff', 
									attributes: [ 'personal_id','personal_correo_institucional' ],
									include: [
										{
											model: personMdl, as: 'person', 
											attributes: [ 'persona_apellidos','persona_nombres' ] 
										}
									]
								},
								{
									model: jobMdl, as: 'job', 
									attributes: [ 'puesto_id','puesto_nombre' ]
								}
							]
						},
						{
							model: ppersonalMdl, as: 'stationresponsible', 
							attributes: [ 'ppersonal_id' ],
							include: [
								{
									model: staffMdl, as: 'staff', 
									attributes: [ 'personal_id','personal_correo_institucional' ],
									include: [
										{
											model: personMdl, as: 'person', 
											attributes: [ 'persona_apellidos','persona_nombres' ] 
										}
									]
								},
								{
									model: jobMdl, as: 'job', 
									attributes: [ 'puesto_id','puesto_nombre' ]
								}
							]
						},
						{
							model: stationMdl, as: 'station', 
							attributes: [ 'estacion_id','estacion_nombre','estacion_nombre_alterno' ]
						},
						{
							model: staffMdl, as: 'user', 
							attributes: [ 'personal_id','personal_correo_institucional' ],
							include: [
								{
									model: personMdl, as: 'person', 
									attributes: [ 'persona_apellidos','persona_nombres' ] 
								}
							]
						}
					],
					offset: offset,
					limit: limit,
					order: [ sort ]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'INSPECCION DE EXTINTORES - LISTADO DE INSPECCIONES');
		} catch (error) {
			db.setEmpty(res,'INSPECCION DE EXTINTORES - LISTADO DE INSPECCIONES',false,error);
		}

	},

	/*
	 * DETALLE DE EQUIPOS
	 */
	async detailById(req, res){
		try {

			// INFORMACION DE EQUIPO
			let inspection = await inspectionModel.findOne({
				where: { inspeccion_id: req.body.inspectionId },
				include: [
					{
						model: ppersonalMdl, as: 'registre', 
						attributes: [ 'ppersonal_id' ],
						include: [
							{
								model: staffMdl, as: 'staff', 
								attributes: [ 'personal_id','personal_correo_institucional' ],
								include: [
									{
										model: personMdl, as: 'person', 
										attributes: [ 'persona_apellidos','persona_nombres' ] 
									}
								]
							},
							{
								model: jobMdl, as: 'job', 
								attributes: [ 'puesto_id','puesto_nombre' ]
							}
						]
					},
					{
						model: ppersonalMdl, as: 'sos', 
						attributes: [ 'ppersonal_id' ],
						include: [
							{
								model: staffMdl, as: 'staff', 
								attributes: [ 'personal_id','personal_correo_institucional' ],
								include: [
									{
										model: personMdl, as: 'person', 
										attributes: [ 'persona_apellidos','persona_nombres' ] 
									}
								]
							},
							{
								model: jobMdl, as: 'job', 
								attributes: [ 'puesto_id','puesto_nombre' ]
							}
						]
					},
					{
						model: ppersonalMdl, as: 'stationresponsible', 
						attributes: [ 'ppersonal_id' ],
						include: [
							{
								model: staffMdl, as: 'staff', 
								attributes: [ 'personal_id','personal_correo_institucional' ],
								include: [
									{
										model: personMdl, as: 'person', 
										attributes: [ 'persona_apellidos','persona_nombres' ] 
									}
								]
							},
							{
								model: jobMdl, as: 'job', 
								attributes: [ 'puesto_id','puesto_nombre' ]
							}
						]
					},
					{
						model: stationMdl, as: 'station', 
						attributes: [ 'estacion_id','estacion_nombre','estacion_nombre_alterno' ]
					},
					{
						model: staffMdl, as: 'user', 
						attributes: [ 'personal_id','personal_correo_institucional' ],
						include: [
							{
								model: personMdl, as: 'person', 
								attributes: [ 'persona_apellidos','persona_nombres' ] 
							}
						]
					}
				]
			});
		
			// RETORNAR MENSAJE
			db.setEmpty(res,'INSPECCION DE EXTINTORES - DETALLE DE INSPECCION',true,inspection);

		} catch (error) { db.setEmpty(res,'INSPECCION DE EXTINTORES - DETALLE DE INSPECCION',false,error); }

	},

}