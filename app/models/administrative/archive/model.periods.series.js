'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_archivo_series_periodos', {
		pserie_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		pserie_registro: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, //  timestamp without time zone default current_timestamp(0), -- 
		pserie_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ARCHIVO PENDIENTE' 
		}, // text default 'ACTIVO'::text, -- 
		
		pserie_fregistro: {
			type: DataTypes.DATE
		}, // date , -- 
		pserie_inicio: {
			type: DataTypes.DATE
		}, // date, -- 
		pserie_cierre: {
			type: DataTypes.DATE
		}, // date, -- 
	
		pserie_plazo_gestion: {
			type: DataTypes.INTEGER
		}, // int, -- PLAZO DE CONSERVACION DEL ARCHIVO
		pserie_plazo_central: {
			type: DataTypes.INTEGER
		}, // int, -- PLAZO DE CONSERVACION DEL ARCHIVO
	
		pserie_disposicionfinal: {
			type: DataTypes.STRING,
			defaultValue: 'CONSERVACION' 
		}, // text default 'CONSERVACIÓN'::text, -- 

		pserie_detalle: {
			type: DataTypes.STRING
		}, // text, -- 
		pserie_observacion: {
			type: DataTypes.STRING
		}, // text, -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}