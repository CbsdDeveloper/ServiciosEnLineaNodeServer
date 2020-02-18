'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_proyectosfinancieros', {
		proyecto_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		proyecto_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		proyecto_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		proyecto_codigo:{
			type: Sequelize.STRING
		}, // text, -- 
		proyecto_descripcion:{
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