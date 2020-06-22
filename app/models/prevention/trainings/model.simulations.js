'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_simulacros', {
		simulacro_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		simulacro_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		simulacro_estado:{
			type: DataTypes.STRING,
			defaultValue: 'PENDIENTE'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		
		simulacro_codigo:{
			type: DataTypes.STRING
		}, // text, -- CÓDIGO DE PROYECTO CBSD
		simulacro_solicitud:{
			type: DataTypes.STRING
		}, // text, -- NÚMERO DE SOLICITUD DE INGRESO AL CBSD
		simulacro_serie:{
			type: DataTypes.INTEGER
		}, // int default 0, -- NÚMERO DE PERMISO DESPACHADO ANUAL
		
		simulacro_fecha: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FECHA SOLICITADA
		simulacro_confirmacion: { 
			type: DataTypes.DATE
		}, // date, -- FECHA PARA CONFIRMACION
		
		simulacro_parroquia:{
			type: DataTypes.STRING
		}, // text, -- PARROQUIA
		simulacro_principal:{
			type: DataTypes.STRING
		}, // text, -- CALLE PRINCIPAL
		simulacro_secundaria:{
			type: DataTypes.STRING
		}, // text, -- CALLE SECUNDARIA
		
		simulacro_tema:{
			type: DataTypes.STRING
		}, // text, -- TEMA A TRATAR
		simulacro_escenario:{
			type: DataTypes.STRING
		}, // text, -- DESCRIBIR ESCENARIO
		simulacro_descripcion:{
			type: DataTypes.STRING
		}, // text, -- DESCRIPCION DE ACTIVIDAD DESEADA
		
		simulacro_observacion:{
			type: DataTypes.STRING
		}, // text -- OBSERVACIONES
		

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}