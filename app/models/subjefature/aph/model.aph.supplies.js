'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_insumosaph', {
		insumo_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		insumo_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		insumo_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		insumo_codigo: { 
			type: DataTypes.STRING,
			unique: true
		}, // text not null,
	
		insumo_presentacion: { 
			type: DataTypes.STRING
		}, // text not null, -- UNIDAD, TABLETAS, FRASCO, AMPOLLA, FUNDA, COMPRIMIDO MASTICABLE, TUBO
		insumo_nombre: { 
			type: DataTypes.STRING
		}, // text not null, -- 
		insumo_concentracion: { 
			type: DataTypes.STRING
		} // text -- 
		
	}, {
		schema: 'subjefatura',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}