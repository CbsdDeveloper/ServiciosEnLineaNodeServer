'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_mantenimientos_menores', {
		mantenimiento_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		mantenimiento_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		mantenimiento_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		tecnico_puesto: {
			type: DataTypes.STRING,
			defaultValue: 'PROFESIONAL TÉCNICO EN SERVICIOS GENERALES' 
		}, // text DEFAULT 'PROFESIONAL TÉCNICO EN SERVICIOS GENERALES'::text, -- CARGO DEL RESPONSABLE
		
		mantenimiento_serie: {
			type: DataTypes.INTEGER
		}, // int default 0, -- 
		mantenimiento_codigo: {
			type: DataTypes.STRING
		}, // text, -- 
		mantenimiento_fecha_mantenimiento: {
			type: DataTypes.DATE
		}, // date not null, -- 
		
		mantenimiento_taller: {
			type: DataTypes.STRING
		}, // text, -- 
		
		mantenimiento_fecha_recepcion: {
			type: DataTypes.DATE
		}, // date, -- 
		mantenimiento_descripcion: {
			type: DataTypes.STRING
		}, // text, -- 
		mantenimiento_observacion: {
			type: DataTypes.STRING
		}, // text, -- 
		
		mantenimiento_costo: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(10,2) default 0, -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}