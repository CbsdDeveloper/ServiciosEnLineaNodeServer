'use strict';
const db = require('../../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../../config/pagination');

const categoryModel = db.administrative.typeMinorTools;

const userMdl = db.admin.users;
const staffMdl = db.tthh.staff;
const personMdl = db.resources.persons;

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
					{ categoria_serie: { [Op.iLike]: '%' + filter + '%'} },
					{ categoria_nombre: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await categoryModel.findAndCountAll({
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
			db.setDataTable(res,{ rows, meta },'SERVICIOS GENERALES - CATEGORIA DE HERRAMIENTAS');
		} catch (error) {
			db.setEmpty(res,'SERVICIOS GENERALES - CATEGORIA DE HERRAMIENTAS',false,error);
		}

	},

	/*
	 * INGRESO DE REGISTRO
	 */
	async listEntity(req, res){

		try {

			let list = await categoryModel.findAll({ 
				where: { categoria_estado: 'ACTIVO' },
				order: [ ['categoria_nombre'] ]
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Listado de categoria de herramientas!',true,list);

		} catch (error) {
			db.setEmpty(res,'GSERVICES - TYPE OF TOOLS - POST',false,error);
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
			await categoryModel.create({
				fk_personal_id: staff.data.personal_id,
				categoria_registro: db.getCurrentDate(),

				categoria_serie: body.categoria_serie,
				categoria_nombre: body.categoria_nombre,
				categoria_descripcion: body.categoria_descripcion
			});

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Registro creado con éxito!',true,{});

		} catch (error) {
			db.setEmpty(res,'GSERVICES - TYPE OF TOOLS - POST',false,error);
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
			body.categoria_registro = db.getCurrentDate();

			// CONSULTAR CATEGORIA
			let category = await categoryModel.findByPk(body.categoria_id);

			// CREAR REGISTRO
			await category.update(body);

			// ENVIAR DADTOS A CLIENTE
			db.setEmpty(res,'¡Registro actualizado con éxito!',true,{});

		} catch (error) {
			db.setEmpty(res,'GSERVICES - TYPE OF TOOLS - PUT',false,error);
		}

	},

};
