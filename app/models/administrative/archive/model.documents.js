'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_archivo_documentos', {
		documento_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		documento_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		documento_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		documento_item: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		documento_numero: {
			type: DataTypes.STRING
		}, // text, -- 
		documento_fecha: {
			type: DataTypes.STRING
		}, // text, -- 
		documento_detalle: {
			type: DataTypes.STRING
		}, // text, -- 
		documento_fdesde: {
			type: DataTypes.DATE
		}, // date, -- 
		documento_fhasta: {
			type: DataTypes.DATE
		}, // date, -- 
		
		fk_envia_entidad: {
			type: DataTypes.STRING,
			defaultValue: 'PUESTOS'
		}, // text default 'PUESTOS'::text, -- 
		fk_envia_entidad_id: {
			type: DataTypes.INTEGER
		}, // int, -- 
		
		documento_departamento: {
			type: DataTypes.STRING
		}, // text, -- 
		documento_dirigido: {
			type: DataTypes.STRING
		}, // text, -- 
		
		documento_fojas: {
			type: DataTypes.INTEGER,
			defaultValue: 1
		}, // int, -- 
		documento_recibido_fecha: {
			type: DataTypes.DATE
		}, // date, -- 
		documento_recibido_numero: {
			type: DataTypes.STRING
		} // text, -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}