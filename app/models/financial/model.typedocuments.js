'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_documentosfinancieros', {
		documento_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		documento_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		documento_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		documento_nombre:{
			type: Sequelize.STRING
		}, // text, -- 
		documento_codigo:{
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