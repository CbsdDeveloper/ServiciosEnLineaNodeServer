'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_programas_poa', {
		programa_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		programa_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		programa_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		programa_nombre:{
			type: Sequelize.STRING
		}, //  text, -- 
		programa_descripcion:{
			type: Sequelize.STRING
		} //  text, -- 

	}, {
		schema: 'planificacion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}