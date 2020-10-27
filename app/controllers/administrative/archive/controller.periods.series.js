'use strict';
const db = require('../../../models');
const { Op } = db.Sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const pserieModel = db.administrative.archiveperiodseries;

const serieMdl = db.administrative.archiveseries;
const periodMdl = db.administrative.archiveperiods;

const leadershipMdl = db.tthh.leaderships;

const staffMdl = db.tthh.staff;
const personMdl = db.resources.persons;

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
			const whr = {
				[Op.or]: [
					{ '$period.periodo_nombre$': { [Op.iLike]: '%' + filter + '%'} },
					
					{ '$serie.section.direccion_nombre$': { [Op.iLike]: '%' + filter + '%'} },
					{ '$serie.subsection.direccion_nombre$': { [Op.iLike]: '%' + filter + '%'} },

					{ '$serie.codigo_archivo$': { [Op.iLike]: '%' + filter + '%'} },
					{ '$serie.serie_nombre$': { [Op.iLike]: '%' + filter + '%'} },
					{ '$serie.subserie_nombre$': { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await pserieModel.findAndCountAll({
				include: [
					{
						model: serieMdl, as: 'serie',
						include: [
							{
								model: leadershipMdl, as: 'section',
								required: false
							},
							{
								model: leadershipMdl, as: 'subsection',
								required: false
							}
						]
					},
					{
						model: periodMdl, as: 'period',
						attributes: ['periodo_nombre'],
					},
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					}
				],
				offset: offset,
				limit: limit,
				where: whr,
				order: [ 
					[ { model: periodMdl, as: 'period' }, 'periodo_nombre', 'DESC' ],
					[ { model: serieMdl, as: 'serie' }, 'codigo_archivo', 'ASC' ] 
				]
			});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ARCHIVO - SERIES Y PERIODOS');

		} catch (error) {
			db.setEmpty(res,'ARCHIVO - SERIES Y PERIODOS',false,error);
		}
	},

	/**
	 * @function paginationEntity
	 * @param {Object} req - server request
	 * @param {Object} res - server response
	 * @returns {Object} - custom response
	*/
	async paginationEntityByPeriodId(req, res){
		try {

			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const whr = {
				[Op.and]: [
					{ fk_periodo_id: req.query.periodId },
					{
						[Op.or]: [
							{ '$serie.section.direccion_nombre$': { [Op.iLike]: '%' + filter + '%'} },
							{ '$serie.subsection.direccion_nombre$': { [Op.iLike]: '%' + filter + '%'} },
		
							{ '$serie.codigo_archivo$': { [Op.iLike]: '%' + filter + '%'} },
							{ '$serie.serie_nombre$': { [Op.iLike]: '%' + filter + '%'} },
							{ '$serie.subserie_nombre$': { [Op.iLike]: '%' + filter + '%'} }
						]
					}
				]
			};
			const { rows, count } = await pserieModel.findAndCountAll({
				include: [
					{
						model: serieMdl, as: 'serie',
						include: [
							{
								model: leadershipMdl, as: 'section',
								required: false
							},
							{
								model: leadershipMdl, as: 'subsection',
								required: false
							}
						]
					},
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					}
				],
				offset: offset,
				limit: limit,
				where: whr,
				order: [ 
					[ { model: serieMdl, as: 'serie' }, 'codigo_archivo', 'ASC' ] 
				]
			});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'ARCHIVO - SERIES Y PERIODOS');

		} catch (error) {
			db.setEmpty(res,'ARCHIVO - SERIES Y PERIODOS',false,error);
		}
	},

	/*
	 * LISTADO DE SERIES Y PERIODOS
	 */
	async recordsByPeriodId(req, res){
		try {

			// LISTADO DE REGISTROS
			const data = await periodMdl.findOne({
				where: {
					periodo_id: req.body.periodId
				},
				include: [
					{
						model: pserieModel, as: 'series',
						include: [
							{
								model: serieMdl, as: 'serie',
								include: [
									{
										model: leadershipMdl, as: 'section',
										required: false
									},
									{
										model: leadershipMdl, as: 'subsection',
										required: false
									},
									{
										model: staffMdl, as: 'user',
										attributes: ['personal_correo_institucional'],
										include: [
											{
												model: personMdl, as: 'person',
												attributes: ['persona_nombres','persona_apellidos']
											}
										]
									}
								]
							}
						]
					}
				]
			});

			// LISTADO DE SERIS
			const series = await serieMdl.findAll({
				where: { serie_entregable: 'SI' },
				include: [
					{ model: leadershipMdl, as: 'section' },
					{ model: leadershipMdl, as: 'subsection', required: false }
				],
				order: [ ['codigo_archivo','ASC'] ]
			});

			// VARIABLES TEMPORALES
			let serieList = {}, model = {};

			series.forEach((v,k) => {
				// GENERAR LISTADO DE SERIES PARA SELECCION
				if(!serieList[v.section.direccion_nombre]) serieList[v.section.direccion_nombre] = [];
				serieList[v.section.direccion_nombre].push(v);
				// GENERAR MODELO TEMPORAL
				model[v.serie_id] = { pserie_estado: 'NA' }
			});

			// LEER SERIES DE UN PERIODO
			data.series.forEach((v,k) => { model[v.fk_serie_id] = v; });

			// RETORNAR CONSULTA
			db.setEmpty(res,'TTHH - LISTADO DE REGISTROS DE SERIES Y PERIODOS',true, { data, serieList, model } );
			
		} catch (error) {
			db.setEmpty(res,'ARCHIVO - LISTADO DE REGISTROS DE SERIES Y PERIODOS',false,error);
		}

	},

	/*
	 * INFORMACION DE REVISION
	 */
	async detailReviewById(req, res){
		try {
			
			// INFORMACION DE REVISION
			const data = await pserieModel.findOne({
				where: { 
					pserie_id: req.body.pserieId 
				},
				include: [
					{
						model: serieMdl, as: 'serie',
						include: [
							{
								model: leadershipMdl, as: 'section',
								required: false
							},
							{
								model: leadershipMdl, as: 'subsection',
								required: false
							}
						]
					},
					{
						model: periodMdl, as: 'period'
					},
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					}
				]
			});
			
			// RETORNAR CONSULTA
			db.setEmpty(res,'TTHH - DETALLE DE REVISION',true, { data } );
			
		} catch (error) {
			db.setEmpty(res,'ARCHIVO - DETALLE DE REVISION',false,error);
		}
	}

};