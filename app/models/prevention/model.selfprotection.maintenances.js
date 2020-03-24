'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_autoproteccion_mantenimiento', {
		mantenimiento_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,
		
		fk_plan_id:{
			type: DataTypes.INTEGER
		}, // int not null references prevencion.tb_planesemergencia(plan_id), -- 
		fk_recurso_id:{
			type: DataTypes.INTEGER
		}, // int not null references resources.tb_recursos(recurso_id) -- RELACION CON RECURSOS
	
		mantenimiento_aplicacion:{
			type: DataTypes.STRING
		}, //
		mantenimiento_actividad:{
			type: DataTypes.STRING
		}, // text, -- 
		mantenimiento_responsable:{
			type: DataTypes.STRING
		}, // text, -- BUENO, REGULAR, MALO
		mantenimiento_periodicidad:{
			type: DataTypes.STRING
		}, // text, -- SEMANAL, QUINCENAL, MENSUAL, BIMENSUAL, TRIMESTRAL, SEMESTRAL, ANUAL, BIANUAL

		mantenimiento_fecha:{
			type: DataTypes.STRING
		}, // text
		mantenimiento_responsable_tipo:{
			type: DataTypes.STRING,
			defaultValue: 'MISMA'
		}, //

		mantenimiento_adjunto:{
			type: DataTypes.STRING,
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