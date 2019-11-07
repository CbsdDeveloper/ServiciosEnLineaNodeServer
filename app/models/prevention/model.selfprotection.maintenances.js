'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_autoproteccion_mantenimiento', {
		mantenimiento_id: {
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
	
		mantenimiento_aplicacion:{
			type: Sequelize.STRING
		}, //
		mantenimiento_actividad:{
			type: Sequelize.STRING
		}, // text, -- 
		mantenimiento_responsable:{
			type: Sequelize.STRING
		}, // text, -- BUENO, REGULAR, MALO
		mantenimiento_periodicidad:{
			type: Sequelize.STRING
		}, // text, -- SEMANAL, QUINCENAL, MENSUAL, BIMENSUAL, TRIMESTRAL, SEMESTRAL, ANUAL, BIANUAL

		mantenimiento_fecha:{
			type: Sequelize.STRING
		}, // text
		mantenimiento_responsable_tipo:{
			type: Sequelize.STRING,
			defaultValue: 'MISMA'
		}, //

		mantenimiento_adjunto:{
			type: Sequelize.STRING,
			defaultValue: 'NA'
		} // text default'NA'::text

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}