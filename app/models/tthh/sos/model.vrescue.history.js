'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_registrosrescatevertical', {
		registro_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		registro_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		registro_estado: { 
			type: DataType.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS

		registro_codigo: { 
			type: DataType.STRING 
		}, // text, -- 
	
		registro_fecha_utilizacion: { 
			type: DataType.DATE 
		}, // timestamp without time zone, -- 
		registro_tiempouso: { 
			type: DataType.INTEGER 
		}, // int, -- 
		
		registro_condiciones_preuso: { 
			type: DataType.STRING 
		}, // text default 'OPTIMO'::text, -- 
		registro_condiciones_postuso: { 
			type: DataType.STRING 
		}, // text default 'OPTIMO'::text, -- 
		registro_actividad: { 
			type: DataType.STRING 
		}, // text, -- 
		
		registro_observaciones: { 
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