'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_training', {
		capacitacion_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		capacitacion_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		capacitacion_estado:{
			type: DataTypes.STRING,
			defaultValue: 'PENDIENTE'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		
		capacitacion_serie:{
			type: DataTypes.INTEGER
		}, // int default 0, -- NUMERO CONSECUTIVO DE SERVICIO - SOLO DESPACHADAS
		capacitacion_codigo:{
			type: DataTypes.STRING
		}, // text, -- CODIGO AUTOGENERADO
		capacitacion_entidad:{
			type: DataTypes.STRING
		}, // text, -- NOMBRE DEL LUGAR DONDE SE LLEVARA LA CAPACITACION
		
		capacitacion_fecha: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FECHA DE SOLICITADA
		capacitacion_confirmacion: { 
			type: DataTypes.DATE
		}, // date, -- FECHA PARA CONFIRMACION
		
		capacitacion_observacion:{
			type: DataTypes.STRING
		}, // text, -- OBSERVACIONES
		capacitacion_solicitud:{
			type: DataTypes.STRING
		}, // text, -- NUMERO DE SOLICITUD (ESPECIE VALORADA)
		
		capacitacion_parroquia:{
			type: DataTypes.STRING
		}, // text, -- PARROQUIA
		capacitacion_principal:{
			type: DataTypes.STRING
		}, // text, -- CALLE PRINCIPAL
		capacitacion_secundaria:{
			type: DataTypes.STRING
		}, // text -- CALLE SECUNDARIA

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}