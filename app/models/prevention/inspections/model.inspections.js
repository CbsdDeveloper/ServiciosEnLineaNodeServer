'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_inspecciones', {
		inspeccion_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		inspeccion_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		inspeccion_estado:{
			type: DataTypes.STRING,
			defaultValue: 'PENDIENTE'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		
		inspeccion_tipo:{
			type: DataTypes.STRING,
			defaultValue: 'INSPECCION'
		}, // text default 'INSPECCION'::text, -- BARRIDO, INSPECCION, OPERATIVO
		inspeccion_codigo:{
			type: DataTypes.STRING
		}, // text, -- CODIGO DE INSPECCION
		inspeccion_serie:{
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- SERIE DE INSPECCION
		inspeccion_informe_numero:{
			type: DataTypes.STRING
		}, // text, -- INSPECCION DE INSPECCION
		
		inspeccion_fingreso: { 
			type: DataTypes.DATE
		}, // date default current_date, -- FECHA EN QUE SE REGISTRA LA INSPECCION
		inspeccion_fecha_inspeccion: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FEHCA PROGRAMADA PARA INSPECCION
		inspeccion_hora_ingreso: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- HORA APROXIMADA QUE INICIA LA INSPECCION
		inspeccion_hora_salida: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- HORA APROXIMADA QUE FINALIZA LA INSPECCION
		
		inspeccion_fecha_reinspeccion: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FECHA DE INSPECCION
		inspeccion_fecha_aprobado: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FECHA DE INSPECCION
		inspeccion_notificar:{
			type: DataTypes.STRING
		}, // text default 'NO'::text, -- NOTIFICAR REINSPECCION: SI, NO
		
		entrevistado_cargo:{
			type: DataTypes.STRING
		}, // text default 'PROPIETARIO'::text, -- TIPO DE ENTREVISTADO: PROPIETARIO, ENCARGADO
		entrevistado_nombre:{
			type: DataTypes.STRING
		}, // text, -- TIPO DE ENTREVISTADO: PROPIETARIO, ENCARGADO
		
		inspeccion_observacion:{
			type: DataTypes.STRING
		}, // text, -- OBSERVACION DE LA INSPECCION
		inspeccion_realiza_cambios:{
			type: DataTypes.STRING,
			defaultValue: 'SI'
		}, // text default 'SI'::text, -- SE REGISTRA O NO CAMBIOS
		inspeccion_realiza_inspeccion:{
			type: DataTypes.STRING,
			defaultValue: 'SI'
		}, // text default 'SI'::text -- SE REALIZA O NO INSPECCION

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}