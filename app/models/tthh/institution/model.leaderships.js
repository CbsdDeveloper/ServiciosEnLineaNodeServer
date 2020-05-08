'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_direcciones', {
		direccion_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, 
		
		direccion_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		direccion_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		direccion_codigo: { 
			type: DataTypes.STRING
		}, // text not null, -- SIGLAS DE DIRECCION
		direccion_nombre: { 
			type: DataTypes.STRING 
		}, // text not null, -- NOMBRE DE DIRECCION
		direccion_competencias: { 
			type: DataTypes.STRING 
		}, // text, -- COMPETENCIAS [HTML]
		
		direccion_fecha_creacion: { 
			type: DataTypes.DATE
		}, // date, -- FECHA DE CREACIÓN
		direccion_baselegal: { 
			type: DataTypes.STRING
		}, // text -- DOCUMENTO / BASE LEGAL DE MOVIMIENTO
		
		direccion_tipo: { 
			type: DataTypes.STRING,
			defaultValue: 'DIRECCION'
		} // text -- 

	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}