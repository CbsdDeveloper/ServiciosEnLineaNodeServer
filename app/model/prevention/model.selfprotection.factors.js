'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_autoproteccion_recursos', {
		factor_id: {
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
	
		factor_tipo:{
			type: Sequelize.STRING
		}, // text, -- POSIBLE SOLUCIÓN A RIESGOS Y PELIGROS, FACTORES INTERNOS, FACTORES EXTERNOS 
		factor_aplica:{
			type: Sequelize.STRING
		}, // text, -- SI, NO
		factor_descripcion:{
			type: Sequelize.STRING
		} // text, -- SI, NO

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}