'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_prorrogas', {
		prorroga_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		prorroga_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		prorroga_estado:{
			type: DataTypes.STRING,
			defaultValue: 'SOLICITUD GENERADA'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		
		prorroga_serie:{
			type: DataTypes.INTEGER
		}, // int not null default 0, -- FECHA DE INCIO DE IMPLEMENTACIÓN
		prorroga_codigo:{
			type: DataTypes.STRING
		}, // text not null, -- FECHA DE INCIO DE IMPLEMENTACIÓN
		prorroga_aprobado:{
			type: DataTypes.DATE
		}, // date, -- FECHA DE INCIO DE IMPLEMENTACIÓN
		
		prorroga_solicitante_cargo:{
			type: DataTypes.STRING
		}, // text not null, -- REGISTRO DE PERSONA QUE SOLICITA
		prorroga_desde:{
			type: DataTypes.DATE
		}, // date, -- FECHA DE INCIO DE IMPLEMENTACIÓN
		prorroga_hasta:{
			type: DataTypes.DATE
		}, // date, -- FECHA TOPE PARA IMPLEMENTACIÓN
		
		prorroga_detalle:{
			type: DataTypes.STRING
		}, // text, -- DETALLE DE REGISTRO
		prorroga_observacion:{
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