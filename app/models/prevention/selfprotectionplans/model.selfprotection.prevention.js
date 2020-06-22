'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_autoproteccion_prevencion', {
		prevencion_id: {
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
	
		prevencion_cantidad:{
			type: DataTypes.STRING
		}, // text, -- 
		prevencion_estado:{
			type: DataTypes.STRING
		}, // text, -- BUENO, REGULAR, MALO
		prevencion_revision:{
			type: DataTypes.STRING
		}, // 
		prevencion_mantenimiento:{
			type: DataTypes.STRING
		}, // text, -- SEMANAL, QUINCENAL, MENSUAL, BIMENSUAL, TRIMESTRAL, SEMESTRAL, ANUAL, BIANUAL
		prevencion_proximo_mantenimiento:{
			type: DataTypes.DATE
		}

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}