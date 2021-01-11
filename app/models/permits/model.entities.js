'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_entidades', {
		entidad_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		entidad_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		entidad_registro:{
			type: DataTypes.DATE
		}, // timestamp without time zone default current_timestamp(0),
		
		entidad_contribuyente:{
			type: DataTypes.STRING
		}, // text default 'natural'::text, -- natural, privada, public, fiscal (unidades educativas)
		entidad_ruc:{
			type: DataTypes.STRING
		}, // text not null, -- número de ruc de la entidad, código AMIE
		entidad_razonsocial:{
			type: DataTypes.STRING
		}, // text not null, -- razón social de la entidad
		entidad_sitioweb:{
			type: DataTypes.STRING
		}, // text,-- sitio web de la institución
		
		notificar_ingreso:{
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}, // boolean default false, -- Notificar mediante email acceso al sistema
		notificar_cambioinformacion:{
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}, // boolean default false, -- Notificar mediante email cambio de información
		notificar_autoinspeccion:{
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}, // boolean default false, -- Notificar mediante email nueva autoinspección
		notificar_permiso:{
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}, // boolean default false, -- Notificar mediante email cuando se emita e permiso de funcionmiento
		label_idioma:{
			type: DataTypes.STRING,
			defaultValue: 'es'
		}, // text default 'es'::text, --idioma de la entidad

		entidad_usuario:{
			type: DataTypes.STRING
		}, // 
		entidad_apoderado:{
			type: DataTypes.STRING
		}, // 
		entidad_correo:{
			type: DataTypes.STRING
		}, // 
		entidad_telefono:{
			type: DataTypes.STRING
		}, // 
		entidad_celular:{
			type: DataTypes.STRING
		}, // 
		entidad_usuario_creacion:{
			type: DataTypes.DATE
		}, // 
		entidad_direccionfacturacion:{
			type: DataTypes.STRING
		}, // 

		entidad_terminos:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, // 
		entidad_terminos_fecha:{
			type: DataTypes.DATE
		}, // 
		entidad_actualizacion:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, // 
	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}