'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_poa_reformas', {
		reforma_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		reforma_registro:{
			type: DataTypes.DATE
		}, //  timestamp without time zone default current_timestamp(0), -- 
		reforma_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		reforma_numero: {
			type: DataTypes.INTEGER
		}, // int default 1, -- NUMERO DE REFORMA
		reforma_nombre: {
			type: DataTypes.STRING
		}, // text, -- NOMBRE EN ORDINAL
		
		reforma_fecha: {
			type: DataTypes.DATE
		}, // date not null, -- FECHA DE REFORMA
		reforma_descripcion: {
			type: DataTypes.STRING
		}, // text -- DESCRIPCION DE REFORMA

	}, {
		schema: 'planificacion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}