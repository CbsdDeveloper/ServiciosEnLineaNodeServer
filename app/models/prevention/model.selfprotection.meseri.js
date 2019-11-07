'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_autoproteccion_meseri', {
		meseri_id: {
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
	
		meseri_coeficiente:{
			type: Sequelize.INTEGER
		} //

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}