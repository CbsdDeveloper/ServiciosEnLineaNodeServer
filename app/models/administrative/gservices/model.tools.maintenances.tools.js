'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_mantenimiento_herramientas', {
		maintenance_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		maintenance_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		maintenance_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		maintenance_tipo: {
			type: DataTypes.STRING
		}, // text, -- 
		
		maintenance_descripcion: {
			type: DataTypes.STRING
		}, // text, -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}