'use strict';
const db = require('../../../models');
const { Op } = db.Sequelize;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const unitModel = db.administrative.units.unit;

const vehicleMdl = db.resources.vehicles;
const ppersonalMdl = db.tthh.ppersonal;
const staffMdl = db.tthh.staff;
const personMdl = db.resources.persons;

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
		console.log('paginacion')
		try {
			const { query: { currentPage, pageLimit, textFilter, sortData } } = req;
			const { limit, offset, filter, sort } = calculateLimitAndOffset(currentPage, pageLimit, textFilter, sortData);
			const where = {
				[Op.or]: [
					{ unidad_nombre: { [Op.iLike]: '%' + filter + '%'} },

					{ '$vehicle.vehiculo_placa$': { [Op.iLike]: '%' + filter + '%'} },
					{ '$vehicle.vehiculo_motor$': { [Op.iLike]: '%' + filter + '%'} },
					{ '$vehicle.vehiculo_chasis$': { [Op.iLike]: '%' + filter + '%'} },

					{ '$station.estacion_nombre$': { [Op.iLike]: '%' + filter + '%'} },
					{ '$station.estacion_nombre_alterno$': { [Op.iLike]: '%' + filter + '%'} },

					{ '$custodian.staff.person.persona_apellidos$': { [Op.iLike]: '%' + filter + '%'} },
					{ '$custodian.staff.person.persona_nombres$': { [Op.iLike]: '%' + filter + '%'} }
				]
			};
				
			const { rows, count } = await unitModel.findAndCountAll({
				offset: offset,
				limit: limit,
				where: where,
				order: [ sort ],
				include: [
					{
						model: vehicleMdl, as: 'vehicle'
					},
					{ 
						model: stationMdl, as: 'station', 
						attributes: ['estacion_nombre','estacion_nombre_alterno'] 
					},
					{
						model: ppersonalMdl, as: 'custodian',
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
						model: userMdl, as: 'user',
						attributes: [ ['usuario_login','usuario'] ]
					}
				]
			});

			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'DIR ADMINISTRATIVA - LISTADO DE UNIDADES');

		} catch (error) { db.setEmpty(res,'DIR ADMINISTRATIVA - LISTADO DE UNIDADES',false,error); }

	}

};