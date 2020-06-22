'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_stands', {
		stand_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		stand_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		stand_estado:{
			type: DataTypes.STRING,
			defaultValue: 'PENDIENTE'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		
		stand_solicitud:{
			type: DataTypes.STRING
		}, // text, -- NUMERO DE SOLICITUD (ESPECIE VALORADA)
		stand_codigo:{
			type: DataTypes.STRING
		}, // text, -- CODIGO AUTOGENERADO
		stand_serie:{
			type: DataTypes.INTEGER
		}, // int default 0, -- NUMERO CONSECUTIVO DE SERVICIO - SOLO DESPACHADAS
		
		stand_tema:{
			type: DataTypes.STRING
		}, // text, -- TEMA DESCRITO POR EL USUARIO
		stand_descripcion:{
			type: DataTypes.STRING
		}, // text, -- DESCRIPCION DE ACTIVIDAD DESEADA
		
		stand_fecha: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FECHA SOLICITADA
		stand_confirmacion: { 
			type: DataTypes.DATE
		}, // date, -- FECHA PARA CONFIRMACION
		
		stand_entidad:{
			type: DataTypes.STRING
		}, // text, -- NOMBRE DE ENTIDAD SOLICITANTE
		
		stand_parroquia:{
			type: DataTypes.STRING
		}, // text, -- PARROQUIA 
		stand_direccion:{
			type: DataTypes.STRING
		}, // text, -- DIRECCION
		
		stand_observacion:{
			type: DataTypes.STRING
		}, // text, -- OBSERVACIONES
		
		stand_auditorio:{
			type: DataTypes.INTEGER
		}, // int default 100

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}