'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_inspeccionextintores', {
		inspeccion_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		inspeccion_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		inspeccion_estado: { 
			type: DataType.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS

		inspeccion_codigo: { 
			type: DataType.STRING 
		}, // text, -- 
		inspeccion_serie: { 
			type: DataType.INTEGER 
		}, // int, --  
		inspeccion_fecha: { 
			type: DataType.DATE 
		}, // date, -- 
		inspeccion_periodo: { 
			type: DataType.STRING 
		}, // text, -- 
		
		inspeccion_observaciones: { 
			type: DataType.STRING 
		}, // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}