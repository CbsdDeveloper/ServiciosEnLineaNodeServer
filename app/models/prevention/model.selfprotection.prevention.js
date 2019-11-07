'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_autoproteccion_prevencion', {
		prevencion_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,
		
		fk_plan_id:{
			type: Sequelize.INTEGER
		}, // int not null references prevencion.tb_planesemergencia(plan_id), -- 
		fk_recurso_id:{
			type: Sequelize.INTEGER
		}, // int not null references resources.tb_recursos(recurso_id) -- RELACION CON RECURSOS
	
		prevencion_cantidad:{
			type: Sequelize.STRING
		}, // text, -- 
		prevencion_estado:{
			type: Sequelize.STRING
		}, // text, -- BUENO, REGULAR, MALO
		prevencion_revision:{
			type: Sequelize.STRING
		}, // 
		prevencion_mantenimiento:{
			type: Sequelize.STRING
		}, // text, -- SEMANAL, QUINCENAL, MENSUAL, BIMENSUAL, TRIMESTRAL, SEMESTRAL, ANUAL, BIANUAL
		prevencion_proximo_mantenimiento:{
			type: Sequelize.DATE
		}

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}