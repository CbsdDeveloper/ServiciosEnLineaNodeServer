'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_unidades', {
		unidad_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		unidad_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		unidad_estado: {
			type: DataTypes.STRING,
			defaultValue: 'OPERATIVO' 
		}, // text default 'OPERATIVO'::text, -- OPERATIVO, MUSEO
		
		unidad_nombre: {
			type: DataTypes.STRING
		}, // text not null, -- 
		unidad_detalle: {
			type: DataTypes.STRING
		}, // text not null, -- 
		unidad_area: {
			type: DataTypes.STRING
		} // text not null -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}