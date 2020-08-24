'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_equiposrescatevertical', {
		equipo_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		equipo_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		equipo_estado: { 
			type: DataType.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS

		equipo_serial: { 
			type: DataType.STRING 
		}, // text, -- 
		equipo_marca: { 
			type: DataType.STRING 
		}, // text, -- 
		equipo_modelo: { 
			type: DataType.STRING 
		}, // text, -- 
		
		equipo_fecha_fabricacion: { 
			type: DataType.DATE 
		}, // date, -- 
		equipo_fecha_compra: { 
			type: DataType.DATE 
		}, // date, -- 
		equipo_fecha_asignacion: { 
			type: DataType.DATE 
		}, // date, -- 

		equipo_detalle: { 
			type: DataType.STRING 
		}, // text, -- 
		equipo_observacion: { 
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