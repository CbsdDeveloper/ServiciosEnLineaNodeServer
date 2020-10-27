'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_documentacion_electronica', {
		delectronica_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		delectronica_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		delectronica_estado: {
			type: DataTypes.STRING,
			defaultValue: 'BORRADOR' 
		}, // text default 'ACTIVO'::text, -- 
		
		delectronica_serie: {
			type: DataTypes.STRING
		}, // text, -- 
		delectronica_nombre: {
			type: DataTypes.STRING
		}, // text not null, -- 
		delectronica_asunto: {
			type: DataTypes.STRING
		}, // text not null, -- 
		
		delectronica_fecha: {
			type: DataTypes.DATE
		}, // date, -- 
		delectronica_documento_anexo: {
			type: DataTypes.STRING
		}, // text, -- 
		delectronica_path: {
			type: DataTypes.STRING
		}, // text, -- 
		
		delectronica_correo: {
			type: DataTypes.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text, -- 
		delectronica_entregado:{
			type: DataTypes.DATE
		}, // timestamp without time zone default current_timestamp(0) -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}