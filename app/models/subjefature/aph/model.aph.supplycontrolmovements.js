'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_movimientos_inventarioaph', {
		movimiento_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		movimiento_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		movimiento_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		movimiento_transaccion: {
			type: DataTypes.STRING
		}, // text not null,
		movimiento_cantidad: { 
			type: DataTypes.DECIMAL(8,2),
		}, // text not null,
		movimiento_descripcion: { 
			type: DataTypes.STRING
		}, // text not null, -- 
		
		fk_table: { 
			type: DataTypes.STRING
		}, // text not null, -- 
		fk_id: { 
			type: DataTypes.INTEGER
		} // text not null, -- 
		
	}, {
		schema: 'subjefatura',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}