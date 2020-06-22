'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_inspeccion_local', {
		
		inspeccion_fecha:{
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FEHCA PROGRAMADA PARA INSPECCION
	
		inspeccion_area_construccion: {
			type: DataTypes.DECIMAL(10,2),
			defaultValue: 0
		}, // numeric (10,2) not null default 0, -- AREA DE CONSTRUCCION
		inspeccion_area: {
			type: DataTypes.DECIMAL(10,2),
			defaultValue: 0
		}, // numeric (10,2) not null default 0, -- AREA UTIL
		inspeccion_aforo:{
			type: DataTypes.INTEGER
		}, // int default 0, -- AFORO DEL PLAN
		inspeccion_plantas:{
			type: DataTypes.INTEGER
		}, // int default 0 -- NUMERO DE PISOS

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});

	Model.removeAttribute('id');
	
	return Model;
}