'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_visitas', {
		visita_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		visita_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		visita_estado:{
			type: DataTypes.STRING,
			defaultValue: 'PENDIENTE'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		
		visita_solicitud:{
			type: DataTypes.STRING
		}, // text, -- NÚMERO DE SOLICITUD DE INGRESO AL CBSD
		visita_codigo:{
			type: DataTypes.STRING
		}, // text, -- CÓDIGO DE PROYECTO CBSD
		visita_serie:{
			type: DataTypes.INTEGER
		}, // int default 0, -- NÚMERO DE PERMISO DESPACHADO ANUAL
		
		visita_entidad:{
			type: DataTypes.STRING
		}, // text, -- NOMBRE DE ENTIDAD SOLICITANTE
		
		visita_aforo:{
			type: DataTypes.INTEGER
		}, // int not null, -- AFORO DEL EVENTO
		
		visita_fecha:{
			type: DataTypes.DATE
		}, // timestamp without time zone not null, -- FECHA SOLICITADA
		visita_confirmacion:{
			type: DataTypes.DATE
		}, // date, -- FECHA PARA CONFIRMACION
		
		visita_despachado:{
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FECHA DE APROBACIÓN DEL PERMISO
		visita_descripcion:{
			type: DataTypes.STRING
		}, // text, -- DESCRIPCION DE ACTIVIDAD DESEADA
		
		visita_observacion:{
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