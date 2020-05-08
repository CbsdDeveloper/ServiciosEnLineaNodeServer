'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_conductores', {
		conductor_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		conductor_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		conductor_estado: { 
			type: DataTypes.STRING
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		conductor_licencia_emision: { 
			type: DataTypes.DATE
		}, // date, -- FECHA DE INGRESO A LA INSTITUCION
		conductor_licencia_validez: { 
			type: DataTypes.DATE
		}, // date, -- FECHA DE SALIDA
		conductor_pdf: { 
			type: DataTypes.DATE
		} // date, -- FECHA DE ACTUALIZACIÓN
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}