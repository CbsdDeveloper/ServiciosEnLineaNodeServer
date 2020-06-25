'use strict';
const db = require('../../../models');
const seq = db.sequelize;

const visitMdl = db.prevention.visits;

const personMdl = db.resources.persons;
const userMdl = db.admin.users;

module.exports = {

	/*
	 * INSPECCIONES DE UN ESTABLECIMIENTO
	 */
	async findByEntityId(req, res){
		// CONSULTA DE MODELOS
		const data = await visitMdl.findAll({
			include: [
				{
					model: personMdl, as: 'requested',
					attributes: [ 'persona_doc_identidad','persona_apellidos','persona_nombres' ]
				},
				{
					model: userMdl, as: 'user',
					attributes: [ ['usuario_login','usuario'] ]
				}
			],
			where: { fk_entidad_id: req.body.entityId },
			order: [ [ 'visita_codigo','DESC' ] ]
		});
		// RETORNAR CONSULTA
		db.setEmpty(res,'VISITAS A LAS INSTALACIONES - ENTIDAD',true,data);
	}

}