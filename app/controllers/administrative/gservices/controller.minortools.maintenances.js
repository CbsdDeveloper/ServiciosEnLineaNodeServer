'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const maintenanceModel = db.administrative.minorMaintenances;

const maintenaceToolsMdl = db.administrative.minorMaintenancesTools;
const toolMdl = db.administrative.minorTools;
const categoryMdl = db.administrative.typeMinorTools;

const userMdl = db.admin.users;

const ppersonalMdl = db.tthh.ppersonal;
const staffMdl = db.tthh.staff;
const personMdl = db.resources.persons;
const stationMdl = db.tthh.stations;

/*
* CONSULTAR INFORMACION DE PERSONAL POR NUMERO DE CEDULA
*/
const getStaffInfo = async (entityId) => {

	let user = await userMdl.findByPk(entityId);

    // VARIABLES AUXILIARES
    let strWhr = {
		include: [{ model: personMdl, as: 'person' }],
		where: { fk_persona_id: user.fk_persona_id }
	};

    // VALIDAR EXISTENCIA DE REGISTROS
    if( await staffMdl.count( strWhr ) >0 ) return db.parseJSON('ok', true, await staffMdl.findOne( strWhr ));

    // ENVIAR MENSAJE POR DEFECTO
    return db.parseJSON('No se ha encontrado ningún registro con los datos que usted a ingresado.');
};

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
					{ mantenimiento_codigo: { [Op.iLike]: '%' + filter + '%'} },
					{ mantenimiento_taller: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await maintenanceModel.findAndCountAll({
				include: [
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
				order: [ sort ]
			});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'SERVICIOS GENERALES - MANTENIMIENTO DE HERRAMIENTAS MENORES');
		} catch (error) {
			db.setEmpty(res,'SERVICIOS GENERALES - MANTENIMIENTO DE HERRAMIENTAS MENORES',false,error);
		}

	},

	/*
	 * DETALLE DEL REGISTRO
	 */
	async detailEntityById(req, res){

		try {

			// INFORMACION DE ENTIDAD
			let maintenance = await maintenanceModel.findOne({
				where: { mantenimiento_id: req.body.entityId },
				include: [
					{
						model: ppersonalMdl, as: 'tservices',
						include: {
							model: staffMdl, as: 'staff',
							attributes: [ 'personal_correo_institucional' ],
							include: [{
								model: personMdl, as: 'person',
								attributes: ['persona_nombres','persona_apellidos']
							}]
						}
					},
					{
						model: maintenaceToolsMdl, as: 'tools',
						include: [
							{
								model: toolMdl, as: 'tool'
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
				]
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Detalles de mantenimiento!',true,maintenance);

		} catch (error) {
			db.setEmpty(res,'SERVICIOS GENERALES - MANTENIMIENTO DE HERRAMIENTAS MENORES - DETALLE',false,error);
		}

	},

	/*
	 * INSERTAR HERRAMIENTAS A MANTENIMIENTO
	 */
	async insertToolsToMaintenance(req, res){

		try {

			let { body } = req;

			let staff = await getStaffInfo(body.sessionId), status = false, data = {}, msg = '¡Este registro ya ha sido ingresado anteriormente!';

			// INFORMACION DE ENTIDAD
			let exist = await maintenaceToolsMdl.count({
				where: {
					fk_mantenimiento_id: body.maintenanceId,
					fk_herramienta_id: body.toolId
				}
			});

			// VALIDAR SI YA EXISTE EL REGISTRO
			if ( exist < 1 ){

				// INFORMACION DE ENTIDAD
				await maintenaceToolsMdl.create({
					fk_personal_id: staff.data.personal_id,
					maintenance_registro: db.getCurrentDate(),

					fk_mantenimiento_id: body.maintenanceId,
					fk_herramienta_id: body.toolId
				});

				// ENVIAR DATOS A CLIENTE
				msg = '¡Registro ingresado correctamente!';
				status = true;

			}
			
			// CONSULTAR LOS REGISTRO
			data = await maintenaceToolsMdl.findAll({ 
				include: [ { model: toolMdl, as: 'tool' } ],
				where: { fk_mantenimiento_id: body.maintenanceId },
				order: [ ['maintenance_id','ASC'] ]
			});

			// ENVIAR DATOS A CLIENTE
			db.setEmpty(res,msg,status,data);

		} catch (error) {
			db.setEmpty(res,'SERVICIOS GENERALES - MANTENIMIENTO DE HERRAMIENTAS MENORES - AGREGAR HERRAMIENTAS',false,error);
		}

	},

	/*
	 * EIMINAR HERRAMIENTAS A MANTENIMIENTO
	 */
	async deleteToolsToMaintenance(req, res){

		try {

			let { query } = req;

			await maintenaceToolsMdl.destroy({ where: { maintenance_id: query.entityId }});

			// CONSULTAR LOS REGISTRO
			let data = await maintenaceToolsMdl.findAll({ 
				include: [ { model: toolMdl, as: 'tool' } ],
				where: { fk_mantenimiento_id: query.maintenanceId },
				order: [ ['maintenance_id','ASC'] ]
			});

			// ENVIAR DATOS A CLIENTE
			db.setEmpty(res,'¡Registro eliminado correctamente!',true,data);

		} catch (error) {
			db.setEmpty(res,'SERVICIOS GENERALES - MANTENIMIENTO DE HERRAMIENTAS MENORES - ELIMINAR HERRAMIENTAS',false,error);
		}

	},

};
