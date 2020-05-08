'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_bioseguridad_covid19', {
		bioseguridad_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,
	
		bioseguridad_registro: {
			type: DataTypes.DATE
		}, // timestamp without time zone default current_timestamp(0), -- 
		bioseguridad_estado: {
			type: DataTypes.STRING
		}, // text default 'ACTIVA'::text, -- CORRECTO, REVISION, ANULADO

		bioseguridad_codigo: {
			type: DataTypes.STRING
		}, // text, -- 
		bioseguridad_fregistro: {
			type: DataTypes.DATE
		}, // date default current_date, -- 

		bioseguridad_local_nombrecomercial: {
			type: DataTypes.STRING
		}, // text, -- 
	
		bioseguridad_local_parroquia: {
			type: DataTypes.STRING
		}, // text, -- 
		bioseguridad_local_principal: {
			type: DataTypes.STRING
		}, // text, -- 
		bioseguridad_local_secundaria: {
			type: DataTypes.STRING
		}, // text, -- 
		bioseguridad_local_referencia: {
			type: DataTypes.STRING
		}, // text, -- 
		bioseguridad_local_aforo: {
			type: DataTypes.INTEGER
		}, // int, -- 
		bioseguridad_local_area: {
			type: DataTypes.DECIMAL(10,2)
		} // numeric(10,2) -- 

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}