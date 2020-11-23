'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_categoria_herramientas', {
		categoria_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		categoria_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		categoria_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		categoria_serie: {
			type: DataTypes.STRING
		}, // int not null, -- 
		categoria_nombre: {
			type: DataTypes.STRING
		}, // text not null, -- 
		categoria_descripcion: {
			type: DataTypes.STRING
		} // text not null -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}