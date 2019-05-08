'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_locales', {
		local_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		local_estado:{
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		local_registro:{
			type: Sequelize.STRING
		}, // timestamp without time zone default current_timestamp(0),
	
		local_imagen:{
			type: Sequelize.STRING,
			defaultValue: 'default.png'
		}, // text default 'ACTIVO'::text,
		local_actividad_economica:{
			type: Sequelize.STRING
		}, // text,
		local_nombrecomercial:{
			type: Sequelize.STRING
		}, // text not null, 
		
		local_parroquia: { 
			type: Sequelize.STRING
		}, // int, 
		local_clavecatastral:{
			type: Sequelize.STRING
		}, // text not null, -- 
		local_principal:{
			type: Sequelize.STRING
		}, // text not null, -- 
		local_secundaria:{
			type: Sequelize.STRING
		}, // text , -- 
		local_referencia:{
			type: Sequelize.STRING
		}, // text, -- 
		local_numero:{
			type: Sequelize.STRING
		}, // text, -- 
		local_telefono:{
			type: Sequelize.STRING
		}, // text,
		local_medidor:{
			type: Sequelize.STRING
		}, // text,
		
		local_piso: { 
			type: Sequelize.INTEGER
		}, // int,
		local_edificio:{
			type: Sequelize.STRING
		}, //   text,
		local_oficina:{
			type: Sequelize.STRING
		}, //   text,
		local_atencion:{
			type: Sequelize.STRING
		}, //   text,
		
		local_tipo:{
			type: Sequelize.STRING
		}, //   text, -- matriz, sucursal
		local_fecha_registro: { 
			type: Sequelize.DATE
		}, // timestamp without time zone, -- 
		
		local_numero_edificaciones: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_pisos: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_subsuelos: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_plantas: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int not null default 0,
		
		local_ocupantes: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_visitantes: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_aforo: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int not null default 0,
		
		local_area_planta_baja: {
			type: Sequelize.DECIMAL(10,2)
		}, // numeric (10,2) default 0, -- AREA DE EDIFICACION
		local_area_subsuelos: {
			type: Sequelize.DECIMAL(10,2)
		}, // numeric (10,2) default 0, -- AREA DE SUBSUELOS
		local_area_construccion: {
			type: Sequelize.DECIMAL(10,2)
		}, // numeric (10,2) default 0, -- AREA DE CONSTRUCCION
		local_area_otros: {
			type: Sequelize.DECIMAL(10,2)
		}, // numeric (10,2) default 0, -- OTRAS AREAS
		local_area: {
			type: Sequelize.DECIMAL(10,2)
		}, // numeric (10,2) not null default 0, -- AREA UTIL DE TRABAJO
		
		local_capacidad_cilindros: {
			type: Sequelize.DECIMAL(10,2)
		}, // numeric (10,2) not null default 0,
		
		local_tipo_edificacion:{
			type: Sequelize.STRING
		}, //  text, -- PUBLICA, PRIVADA, IMIXTA
		local_edificacion:{
			type: Sequelize.STRING
		}, //  text, -- PROPIA, ARRENDADA
		local_area_terreno:{
			type: Sequelize.STRING
		}, //  text, -- AREA DEL TERRENO
		local_altura_edificacion:{
			type: Sequelize.STRING
		}, //  text, -- ALTURA DE LA EDIFICACION
		local_material_construccion:{
			type: Sequelize.STRING
		}, //  text, -- MATERIAL DE CONSTRUCCIÓN
		local_actividad_principal:{
			type: Sequelize.STRING
		}, //  text, -- ACTIVIDAD A LA QUE SE DEDICA

		local_aforo_hombres: {
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_mujeres: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_especiales: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_especiales_mujeres: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_campo: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_planta: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_simultaneo: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 

		local_longitud:{
			type: Sequelize.STRING,
			defaultValue: '-79.16464805603027'
		}, //  text, -- ALTURA DE LA EDIFICACION
		local_latitud:{
			type: Sequelize.STRING,
			defaultValue: '-0.2531997068768405'
		}, //  text, -- ALTURA DE LA EDIFICACION
		local_zoom:{
			type: Sequelize.STRING,
			defaultValue: '13'
		}, //  text, -- ALTURA DE LA EDIFICACION
		
		local_anios_construccion:{
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, //  text, -- ALTURA DE LA EDIFICACION
		local_area_sector_incendio:{
			type: Sequelize.DECIMAL(7,2),
			defaultValue: 0
		} //  text, -- ALTURA DE LA EDIFICACION

	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}