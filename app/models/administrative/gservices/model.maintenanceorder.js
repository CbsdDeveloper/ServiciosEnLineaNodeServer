'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_ordenesmantenimiento', {
		orden_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		orden_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		orden_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		orden_fecha_entrega: {
			type: DataTypes.DATE
		}, // date, -- FECHA EN QUE SE ENTREGA AL SOLICITANTE
		
		tecnico_puesto: {
			type: DataTypes.STRING
		}, // text DEFAULT 'PROFESIONAL TÉCNICO EN SERVICIOS GENERALES'::text, -- CARGO DEL RESPONSABLE
		
		orden_codigo: {
			type: DataTypes.STRING
		}, // text not null, -- CODIGO GENRADO
		orden_serie: {
			type: DataTypes.INTEGER
		}, // int not null default 0, -- ORDEN DE MANTENIMIENTO
		orden_fecha_mantenimiento_tipo: {
			type: DataTypes.STRING
		}, // text default 'SISTEMA'::text, -- VARIABLE DEL SISTEMA
		orden_fecha_mantenimiento:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone not null, -- FECHA DE MANTENIMIENTO
		orden_km_mantenimiento: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(10,2) not null, -- 
		
		ultimo_fecha_mantenimiento: {
			type: DataTypes.DATE
		}, // date, -- FECHA DE MANTENIMIENTO
		ultimo_km_mantenimiento: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(10,2) not null, -- 
		
		orden_observaciones: {
			type: DataTypes.STRING
		}, // text, -- DETALLAR OBSERVACIONES
		
		orden_fecha_recepcion: {
			type: DataTypes.DATE
		}, // date, -- FECHA EN QUE EL TALLE DEVUELVE LA UNIDAD
		orden_quien_recepcion: {
			type: DataTypes.STRING
		}, // text, -- NOMBRE DE LA PERSONA QUE ENTREGA LA UNIDAD
		orden_cargo_recepcion: {
			type: DataTypes.STRING
		}, // text, -- CARGO DE LA PERSONA QUE ENTREGA LA UNIDAD
		
		orden_tipomantenimiento: {
			type: DataTypes.STRING
		}, // text DEFAULT 'CORRECTIVO'::text, -- 
		orden_proximomantenimiento: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric(10,2) -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}