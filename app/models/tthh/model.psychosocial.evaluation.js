'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_evaluacionesriesgopsicosocial', {
		evaluacion_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		evaluacion_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		evaluacion_estado: { 
			type: DataType.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		evaluacion_inicio: { 
			type: DataType.DATE
		}, // text not null, -- NOMBRE DE PUESTO
		evaluacion_cierre: { 
			type: DataType.DATE
		} // text not null, -- NOMBRE DE PUESTO
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}