'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_archivo_seriesdocumentales', {
		serie_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		serie_registro: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, //  timestamp without time zone default current_timestamp(0), -- 
		serie_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		codigo_archivo: {
			type: DataTypes.STRING
		}, // text not null, -- 
		serie_entregable: {
			type: DataTypes.STRING,
			defaultValue: 'SI' 
		}, // text not null, -- 
		
		serie_nombre: {
			type: DataTypes.STRING
		}, // text, -- 
		subserie_nombre: {
			type: DataTypes.STRING
		}, // text, -- 
		
		serie_descripcion: {
			type: DataTypes.STRING
		}, // text, -- 
		serie_documentosconformativos: {
			type: DataTypes.STRING
		}, // text, -- 
		serie_origendocumentacion: {
			type: DataTypes.STRING
		}, // text
	
		serie_plazo_gestion: {
			type: DataTypes.INTEGER
		}, // int default 2, -- PLAZO DE CONSERVACION DEL ARCHIVO
		serie_plazo_central: {
			type: DataTypes.INTEGER
		}, // int default 5, -- PLAZO DE CONSERVACION DEL ARCHIVO
	
		serie_disposicionfinal: {
			type: DataTypes.STRING,
			defaultValue: 'CONSERVACION' 
		}, // text default 'CONSERVACION'::text, -- CONSERVACION, ELIMINACION
		
		serie_observacion: {
			type: DataTypes.STRING
		}, // text -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}