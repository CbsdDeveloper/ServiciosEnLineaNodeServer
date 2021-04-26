'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_extintores', {
		extintor_id: {
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		extintor_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		extintor_estado: {
			type: DataType.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS

		extintor_ubicacion: {
			type: DataType.STRING
		}, // text, -- 
		
		extintor_serie: {
			type: DataType.STRING
		}, // text, -- 
		
		extintor_agente: {
			type: DataType.STRING,
			defaultValue: 'CO2' 
		}, // text not null DEFAULT 'CO2'::text, -- 
		extintor_libras: {
			type: DataType.INTEGER 
		}, // int, -- 
		
		extintor_observacion: {
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