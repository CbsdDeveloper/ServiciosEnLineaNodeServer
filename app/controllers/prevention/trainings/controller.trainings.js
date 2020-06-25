'use strict';
const db = require('../../../models');
const seq = db.sequelize;

const trainingMdl = db.prevention.trainings;
const trainingTopicMdl = db.prevention.trainingTopics;

const personMdl = db.resources.persons;
const userMdl = db.admin.users;

module.exports = {

	/*
	 * INSPECCIONES DE UN ESTABLECIMIENTO
	 */
	async findByEntityId(req, res){
		// CONSULTA DE MODELOS
		const data = await trainingMdl.findAll({
			include: [
				{
					model: trainingTopicMdl, as: 'topic'
				},
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
			order: [ [ 'capacitacion_codigo','DESC' ] ]
		});
		// RETORNAR CONSULTA
		db.setEmpty(res,'CAPACITACIONES DE UNA ENTIDAD',true,data);
	}

}