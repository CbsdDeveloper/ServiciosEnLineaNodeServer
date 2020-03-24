'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_clasificadorpresupuestario', {
		clasificador_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		clasificador_registro:{
			type: DataTypes.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		clasificador_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		clasificador_codigo:{
			type: DataTypes.STRING
		}, // text, -- 
		clasificador_nombre:{
			type: DataTypes.STRING
		}, // text, -- 
		clasificador_descripcion:{
			type: DataTypes.STRING
		} // text -- 

	}, {
		schema: 'financiero',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}