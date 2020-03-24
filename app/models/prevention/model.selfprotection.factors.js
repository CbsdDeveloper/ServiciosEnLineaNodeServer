'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_autoproteccion_recursos', {
		factor_id: {
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
	
		factor_tipo:{
			type: DataTypes.STRING
		}, // text, -- POSIBLE SOLUCIÓN A RIESGOS Y PELIGROS, FACTORES INTERNOS, FACTORES EXTERNOS 
		factor_aplica:{
			type: DataTypes.STRING
		}, // text, -- SI, NO
		factor_descripcion:{
			type: DataTypes.STRING
		} // text, -- SI, NO

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}