'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const fextinguisherModel = db.tthh.fextinguisher.list;

const reviewMdl = db.tthh.fextinguisher.reviews;

const stationMdl = db.tthh.stations;

const staffMdl = db.tthh.staff;
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
					{ extintor_serie: { [Op.iLike]: '%' + filter + '%'} },
					{ extintor_agente: { [Op.iLike]: '%' + filter + '%'} },
					{ extintor_ubicacion: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await fextinguisherModel.findAndCountAll(
				{
					where: where,
					include: [
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
			db.setDataTable(res,{ rows, meta },'INSPECCION DE EXTINTORES - LISTADO DE EXTINTORES');
		} catch (error) {
			db.setEmpty(res,'INSPECCION DE EXTINTORES - LISTADO DE EXTINTORES',false,error);
		}

	},

	/*
	 * LISTAR EXTINTORES DE CADA ESTACION
	 */
	async listByStation(req, res){
		try {

			// LISTADO DE EXTINTORES
			let list = await fextinguisherModel.findAll({
				include: [
					{ 
						model: stationMdl, as: 'station', 
						attributes: [ 'estacion_id','estacion_nombre','estacion_nombre_alterno' ]
					}
				]
			});

			// EXTINTORES INGRESADOS EN LAS INSPECCIONES
			let selected = await reviewMdl.findAll({
				where: { fk_inspeccion_id: req.body.inspectionId }
			});
			
			// RETORNAR CONSULTA
			db.setEmpty(res,'INSPECCION DE EXTINTORES - LISTADO DE EXTINTORES POR ESTACION',true,{ list, selected });

		} catch (error) {
			db.setEmpty(res,'INSPECCION DE EXTINTORES - LISTADO DE EXTINTORES POR ESTACION',false,error);
		}

	},



}