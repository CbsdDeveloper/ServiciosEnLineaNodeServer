'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_entidades', {
		entidad_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		entidad_estado:{
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		entidad_registro:{
			type: Sequelize.STRING
		}, // timestamp without time zone default current_timestamp(0),
		
		entidad_contribuyente:{
			type: Sequelize.STRING
		}, // text default 'natural'::text, -- natural, privada, public, fiscal (unidades educativas)
		entidad_ruc:{
			type: Sequelize.STRING
		}, // text not null, -- número de ruc de la entidad, código AMIE
		entidad_razonsocial:{
			type: Sequelize.STRING
		}, // text not null, -- razón social de la entidad
		entidad_sitioweb:{
			type: Sequelize.STRING
		}, // text,-- sitio web de la institución
		
		notificar_ingreso:{
			type: Sequelize.BOOLEAN,
			defaultValue: false
		}, // boolean default false, -- Notificar mediante email acceso al sistema
		notificar_cambioinformacion:{
			type: Sequelize.BOOLEAN,
			defaultValue: false
		}, // boolean default false, -- Notificar mediante email cambio de información
		notificar_autoinspeccion:{
			type: Sequelize.BOOLEAN,
			defaultValue: false
		}, // boolean default false, -- Notificar mediante email nueva autoinspección
		notificar_permiso:{
			type: Sequelize.BOOLEAN,
			defaultValue: false
		}, // boolean default false, -- Notificar mediante email cuando se emita e permiso de funcionmiento
		label_idioma:{
			type: Sequelize.STRING,
			defaultValue: 'es'
		}, // text default 'es'::text, --idioma de la entidad

		entidad_usuario:{
			type: Sequelize.STRING
		}, // 
		entidad_apoderado:{
			type: Sequelize.STRING
		}, // 
		entidad_correo:{
			type: Sequelize.STRING
		}, // 
		entidad_telefono:{
			type: Sequelize.STRING
		}, // 
		entidad_celular:{
			type: Sequelize.STRING
		}, // 
		entidad_usuario_creacion:{
			type: Sequelize.DATE
		} // 
	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}