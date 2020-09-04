'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
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
					{ periodo_nombre: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await pserieModel.findAndCountAll({
				offset: offset,
				limit: limit,
				// where: whr,
				order: [ sort ]
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
			let data = await periodMdl.findOne({
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
			let series = await serieMdl.findAll({
				where: { serie_entregable: 'SI' },
				include: [
					{ model: leadershipMdl, as: 'section' },
					{ model: leadershipMdl, as: 'subsection', required: false }
				],
				order: [ ['codigo_archivo','ASC'] ]
			});

			let serieList = {};
			series.forEach((v,k) => {
				
				if(!serieList[v.section.direccion_nombre]) serieList[v.section.direccion_nombre] = [];
				
				serieList[v.section.direccion_nombre].push(v);

			});

			// RETORNAR CONSULTA
			db.setEmpty(res,'TTHH - LISTADO DE REGISTROS DE SERIES Y PERIODOS',true, { data, serieList } );
			
		} catch (error) {
			db.setEmpty(res,'ARCHIVO - LISTADO DE REGISTROS DE SERIES Y PERIODOS',false,error);
		}

	}


};