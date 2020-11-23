'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const toolModel = db.administrative.minorTools;
const categoryMdl = db.administrative.typeMinorTools;

const userMdl = db.admin.users;
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
					{ '$category.categoria_serie$': { [Op.iLike]: '%' + filter + '%'} },
					{ '$category.categoria_nombre$': { [Op.iLike]: '%' + filter + '%'} },

					{ herramienta_codigo: { [Op.iLike]: '%' + filter + '%'} },
					{ herramienta_descripcion: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await toolModel.findAndCountAll({
				include: [
					{
						model: categoryMdl, as: 'category',
						attributes: [ 'categoria_serie','categoria_nombre' ]
					},
					{
						model: stationMdl, as: 'station',
						attributes: [ 'estacion_nombre','estacion_nombre_alterno' ]
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
				order: [ sort ]
			});
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'SERVICIOS GENERALES - HERRAMIENTAS MENORES');
		} catch (error) {
			db.setEmpty(res,'SERVICIOS GENERALES - HERRAMIENTAS MENORES',false,error);
		}

	},

	/*
	 * INGRESO DE REGISTRO
	 */
	async listEntity(req, res){

		try {

			let list = await toolModel.findAll({ 
				order: [ ['herramienta_codigo'] ]
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Listado de herramientas!',true,list);

		} catch (error) {
			db.setEmpty(res,'GSERVICES - MINOR TOOLS - LIST',false,error);
		}

	},

	/*
	 * INGRESO DE REGISTRO
	 */
	async newEntity(req, res){

		try {

			// OBTENER DATOS DE FORMULARIO
			let { body } = req;

			let staff = await getStaffInfo(body.sessionId);

			// CREAR REGISTRO
			await toolModel.create({
				fk_personal_id: staff.data.personal_id,
				herramienta_registro: db.getCurrentDate(),

				fk_categoria_id: body.fk_categoria_id,
				fk_estacion_id: body.fk_estacion_id,
				fk_custodio_id: staff.data.personal_id,

				herramienta_codigo: body.herramienta_codigo,
				herramienta_descripcion: body.herramienta_descripcion,
				herramienta_observacion: body.herramienta_observacion
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Registro creado con éxito!',true,{});

		} catch (error) {
			db.setEmpty(res,'GSERVICES - MINOR TOOLS - POST',false,error);
		}

	},

	/*
	 * ACTUALIZACION DE REGISTRO
	 */
	async updateEntity(req, res){

		try {

			// OBTENER DATOS DE FORMULARIO
			let { body } = req;

			let staff = await getStaffInfo(body.sessionId);
			
			// INGRESO DE DATOS DE ACTUALIZACION
			body.fk_personal_id = staff.data.personal_id;
			body.herramienta_registro = db.getCurrentDate();

			// CONSULTAR CATEGORIA
			let tool = await toolModel.findByPk(body.herramienta_id);

			// CREAR REGISTRO
			await tool.update(body);

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Registro actualizado con éxito!',true,{});

		} catch (error) {
			db.setEmpty(res,'GSERVICES - MINOR TOOLS - PUT',false,error);
		}

	},

};
