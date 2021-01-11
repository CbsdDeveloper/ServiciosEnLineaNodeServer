'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_locales', {
		local_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		local_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		local_registro:{
			type: DataTypes.DATE
		}, // timestamp without time zone default current_timestamp(0),
	
		local_imagen:{
			type: DataTypes.STRING,
			defaultValue: 'default.png'
		}, // text default 'ACTIVO'::text,
		local_actividad_economica:{
			type: DataTypes.STRING
		}, // text,
		local_nombrecomercial:{
			type: DataTypes.STRING
		}, // text not null, 
		
		local_parroquia: { 
			type: DataTypes.STRING
		}, // int, 
		local_clavecatastral:{
			type: DataTypes.STRING
		}, // text not null, -- 
		local_principal:{
			type: DataTypes.STRING
		}, // text not null, -- 
		local_secundaria:{
			type: DataTypes.STRING
		}, // text , -- 
		local_referencia:{
			type: DataTypes.STRING
		}, // text, -- 
		local_numero:{
			type: DataTypes.STRING
		}, // text, -- 
		local_telefono:{
			type: DataTypes.STRING
		}, // text,
		local_medidor:{
			type: DataTypes.STRING
		}, // text,
		
		local_piso: { 
			type: DataTypes.INTEGER
		}, // int,
		local_edificio:{
			type: DataTypes.STRING
		}, //   text,
		local_oficina:{
			type: DataTypes.STRING
		}, //   text,
		local_atencion:{
			type: DataTypes.STRING
		}, //   text,
		
		local_tipo:{
			type: DataTypes.STRING
		}, //   text, -- matriz, sucursal
		local_fecha_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- 
		
		local_numero_edificaciones: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_pisos: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_subsuelos: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_plantas: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int not null default 0,
		
		local_ocupantes: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_visitantes: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0,
		local_aforo: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int not null default 0,
		
		local_area_planta_baja: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric (10,2) default 0, -- AREA DE EDIFICACION
		local_area_subsuelos: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric (10,2) default 0, -- AREA DE SUBSUELOS
		local_area_construccion: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric (10,2) default 0, -- AREA DE CONSTRUCCION
		local_area_otros: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric (10,2) default 0, -- OTRAS AREAS
		local_area: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric (10,2) not null default 0, -- AREA UTIL DE TRABAJO
		
		local_capacidad_cilindros: {
			type: DataTypes.DECIMAL(10,2)
		}, // numeric (10,2) not null default 0,
		
		local_tipo_edificacion:{
			type: DataTypes.STRING
		}, //  text, -- PUBLICA, PRIVADA, IMIXTA
		local_edificacion:{
			type: DataTypes.STRING
		}, //  text, -- PROPIA, ARRENDADA
		local_area_terreno:{
			type: DataTypes.STRING
		}, //  text, -- AREA DEL TERRENO
		local_altura_edificacion:{
			type: DataTypes.STRING
		}, //  text, -- ALTURA DE LA EDIFICACION
		local_material_construccion:{
			type: DataTypes.STRING
		}, //  text, -- MATERIAL DE CONSTRUCCIÓN
		local_actividad_principal:{
			type: DataTypes.STRING
		}, //  text, -- ACTIVIDAD A LA QUE SE DEDICA

		local_aforo_hombres: {
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_mujeres: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_especiales: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_especiales_mujeres: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_campo: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_planta: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 
		local_aforo_simultaneo: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- 

		local_longitud:{
			type: DataTypes.STRING,
			defaultValue: '-79.16464805603027'
		}, //  text, -- ALTURA DE LA EDIFICACION
		local_latitud:{
			type: DataTypes.STRING,
			defaultValue: '-0.2531997068768405'
		}, //  text, -- ALTURA DE LA EDIFICACION
		local_zoom:{
			type: DataTypes.STRING,
			defaultValue: '13'
		}, //  text, -- ALTURA DE LA EDIFICACION
		
		local_anios_construccion:{
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, //  text, -- ALTURA DE LA EDIFICACION
		local_area_sector_incendio:{
			type: DataTypes.DECIMAL(7,2),
			defaultValue: 0
		}, //  text, -- ALTURA DE LA EDIFICACION

		local_impuestopredial:{
			type: DataTypes.STRING
		}, //
		local_usodesuelo:{
			type: DataTypes.STRING
		}, //
		local_establecimiento:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, //  text, -- ALTURA DE LA EDIFICACION

		local_aperturasri:{
			type: DataTypes.DATE
		}, // FEHCA DE INICIO DE ACTIVIDADES SRI
		local_numeroestablecimiento:{
			type: DataTypes.INTEGER
		}, // NUMERO DE ESTABLECIMIENTO SRI
		local_certificadostablecimiento:{
			type: DataTypes.STRING
		}, // CERTIFICADO DE ESTABLECIMIENTO REGISTRADO SRI

	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}