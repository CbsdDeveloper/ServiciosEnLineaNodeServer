'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_evaluacionpersonal', {
		test_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		test_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		test_estado: { 
			type: DataType.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS

		evaluado_correo: { 
			type: DataType.STRING
		}, // text, -- 
		evaluado_telefonos: { 
			type: DataType.STRING
		}, // text, -- 
		evaluado_edad: { 
			type: DataType.STRING
		}, // text, -- 
		evaluado_cargo: { 
			type: DataType.STRING
		}, // text, -- 
		evaluado_fechainscripcion: { 
			type: DataType.DATE
		}, // timestamp without time zone default current_timestamp(0) -- 
		evaluado_fechaevaluacion: { 
			type: DataType.DATE
		} // timestamp without time zone default current_timestamp(0) -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}