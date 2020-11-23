'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_herramientasmenores', {
		herramienta_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		herramienta_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		herramienta_estado: {
			type: DataTypes.STRING,
			defaultValue: 'BUEN ESTADO' 
		}, // text default 'ACTIVO'::text, -- 
		
		herramienta_codigo: {
			type: DataTypes.STRING
		}, // text not null, -- 
		herramienta_descripcion: {
			type: DataTypes.STRING
		}, // text not null, -- 
		herramienta_observacion: {
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