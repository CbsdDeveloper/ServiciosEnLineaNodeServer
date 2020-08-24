'use strict';
const db = require('../../../models');
const seq = db.sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const platoonModel = db.tthh.platoons;
const stationMdl = db.tthh.stations;

const userMdl = db.admin.users;

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
			const { rows, count } = await platoonModel.findAndCountAll(
				{
					offset: offset,
					limit: limit,
					order: [ sort ],
					include: [
						{
							model: userMdl, as: 'user',
							attributes: [ ['usuario_login','usuario'] ]
						}
					]
				});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'TTHH - LISTADO DE PELOTONES');

		} catch (error) { db.setEmpty(res,'TTHH - LISTADO DE PELOTONES',false,error); }

	},

	// ESTACIONES POR ID
	async findAllBySations(req, res){
		try {

			// LISTADO DE ESTACIONES
			let platoons = await {} ;

			let stations = await stationMdl.findAll({
				attributes: [ 'estacion_id','estacion_nombre','estacion_nombre_alterno' ],
				include: [
					{
						model: platoonModel, as: 'platoons',
						attributes: [ 'peloton_nombre','peloton_id' ]
					}
				]
			});

			// OBTENER PELOTONES DE CADA ESTACION
			stations.forEach((v, k) => {
				// LISTA DE PELOTONES
				platoons[v.estacion_id] = v.platoons;
			});

			// RETORNAR CONSULTA
			db.setEmpty(res,'TTHH - LISTADO DE PELOTONES',true,{ platoons, stations });

		} catch (error) { db.setEmpty(res,'TTHH - LISTADO DE PELOTONES',false,error); }
	},

};