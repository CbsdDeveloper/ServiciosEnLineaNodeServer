'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_clasificadorpresupuestario', {
		clasificador_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		clasificador_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		clasificador_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		clasificador_codigo:{
			type: Sequelize.STRING
		}, // text, -- 
		clasificador_nombre:{
			type: Sequelize.STRING
		}, // text, -- 
		clasificador_descripcion:{
			type: Sequelize.STRING
		} // text -- 

	}, {
		schema: 'financiero',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}