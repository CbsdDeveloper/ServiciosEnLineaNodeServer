'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_ciiu', {
		ciiu_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		ciiu_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		ciiu_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		ciiu_evento:{
			type: DataTypes.STRING,
			defaultValue: 'INGRESO'
		}, // text default 'INGRESO'::text,
		
		ciiu_codigo:{
			type: DataTypes.STRING
		}, // text not null, -- 
		ciiu_nombre:{
			type: DataTypes.STRING
		}, // text not null, -- 
		
		ciiu_codigo_v3:{
			type: DataTypes.STRING
		}, // text, -- 
		ciiu_nombre_v3:{
			type: DataTypes.STRING
		}, // text -- 
	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}