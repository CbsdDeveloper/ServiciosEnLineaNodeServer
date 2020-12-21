'use strict';
const db = require('../../models');
const Op = db.Sequelize.Op;
const { calculateLimitAndOffset, paginate } = require('../../config/pagination');

const reformModel = db.planing.reforms;

const poaMdl = db.planing.poa;
const projectMdl = db.planing.poaprojects;

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
					{ poa_periodo: { [Op.iLike]: '%' + filter + '%'} }
				]
			};
			const { rows, count } = await reformModel.findAndCountAll({
				include: [
					{
						model: staffMdl, as: 'user',
						attributes: ['personal_correo_institucional'],
						include: [{
							model: personMdl, as: 'person',
							attributes: ['persona_nombres','persona_apellidos']
						}]
					},
					{
						model: poaMdl, as: 'poa',
						include: [
							{
								model: staffMdl, as: 'user',
								attributes: ['personal_correo_institucional'],
								include: [{
									model: personMdl, as: 'person',
									attributes: ['persona_nombres','persona_apellidos']
								}]
							}
						]
					}
				],
				offset: offset,
				limit: limit/*,
				where: whr,
				order: [ sort ]*/
			});	
			const meta = paginate(currentPage, count, rows, pageLimit);
			db.setDataTable(res,{ rows, meta },'PLANIFICACION - LISTAR REFORMAS VIGENTES DEL POA');
		} catch (error) {
			db.setEmpty(res,'PLANIFICACION - LISTAR REFORMAS VIGENTES DEL POA POA',false,error);
		}

	},

	/*
	 * ACTUALIZAR REFORMA
	 */
	async updateEntity(req, res){
		
		try {

			// OBTENER FORMULARIO
			let { body } = req;

			// DATOS DE SESSION
			let staff = await getStaffInfo(body.sessionId);

			// ACTUALIZAR REFORMA
			let temp = {
				fk_personal_id: staff.data.personal_id,
				reforma_estado: 'VIGENTE',
				reforma_registro: db.getCurrentDate(),
				reforma_descripcion: 'REFORMA FINALIZADA EL ' + db.getCurrentDate()
			};

			// CREAR REGISTRO
			await reformModel.update(
				temp,
				{
					where: { reforma_id: body.reformId }
				}
			);

			// ACTUALIZAR PROYECTOS DE REFORMA
			await projectMdl.update(
				{
					proyecto_estado: 'CONFIRMADO'
				},
				{
					where: { fk_reforma_id: body.reformId }
				}
			);

			
			db.setEmpty(res,'REFORMA FINALIZADA CON ÉXITO',true,body);
			
		} catch (error) {
			db.setEmpty(res,'PLANIFICACION - SETTEAR COMO VIGENTE LA REFORMA ACTUAL',false,error);
		}
		
	}

};