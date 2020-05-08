'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_archivo_folder', {
		folder_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		folder_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		folder_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		folder_seriedocumental: {
			type: DataTypes.STRING
		}, // text not null, -- 
		folder_subseriedocumental: {
			type: DataTypes.STRING
		}, // text, -- 
		folder_descripcion: {
			type: DataTypes.STRING
		}, // text, -- 
		
		folder_codigoarchivo: {
			type: DataTypes.STRING
		}, // text not null, -- 
		folder_numeroexpediente: {
			type: DataTypes.STRING
		}, // text not null, -- 
		folder_anio: {
			type: DataTypes.INTEGER
		}, // int, -- 
		folder_fapertura: {
			type: DataTypes.DATE
		}, // date, -- 
		folder_fcierre: {
			type: DataTypes.DATE
		}, // date, -- 
		
		folder_valordocumental: {
			type: DataTypes.STRING
		}, // text, -- 
		folder_condicionesacceso: {
			type: DataTypes.STRING
		}, // text, -- 
		
		folder_plazoconservacion: {
			type: DataTypes.INTEGER,
			defaultValue: 12
		}, // int default 12, -- meses
		folder_destinofinal: {
			type: DataTypes.STRING
		}, // text, -- 
		folder_soporte: {
			type: DataTypes.STRING
		}, // text, -- 
		
		documentacion_fojas: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		documentacion_fojas_inicio: {
			type: DataTypes.STRING
		}, // text, -- 
		documentacion_fojas_fin: {
			type: DataTypes.STRING
		} // text -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}