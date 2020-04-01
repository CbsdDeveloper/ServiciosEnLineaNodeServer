'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_inventario_insumosaph', {
		inventario_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		inventario_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		inventario_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		inventario_codigo: { 
			type: DataTypes.STRING
		}, // text not null,
		inventario_tipo: { 
			type: DataTypes.STRING
		}, // text not null,
	
		inventario_fecha_registro: { 
			type: DataTypes.DATE
		}, // text not null, -- 
		inventario_descripcion: { 
			type: DataTypes.STRING
		} // text not null, -- 
		
	}, {
		schema: 'subjefatura',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}