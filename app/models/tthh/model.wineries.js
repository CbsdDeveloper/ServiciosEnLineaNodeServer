'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_bodegas', {
		bodega_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		bodega_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		bodega_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		bodega_nombre: { 
			type: DataTypes.STRING
		}, // date, -- 
		bodega_modalidad: { 
			type: DataTypes.STRING
		}, // int, -- 
		bodega_partes: { 
			type: DataTypes.STRING 
		} // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}