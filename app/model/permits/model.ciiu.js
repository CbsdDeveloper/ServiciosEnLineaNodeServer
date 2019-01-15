'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_ciiu', {
		ciiu_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		ciiu_estado:{
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		ciiu_registro:{
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}, // timestamp without time zone default current_timestamp(0),
		ciiu_evento:{
			type: Sequelize.STRING,
			defaultValue: 'INGRESO'
		}, // text default 'INGRESO'::text,
		
		ciiu_codigo:{
			type: Sequelize.STRING
		}, // text not null, -- 
		ciiu_nombre:{
			type: Sequelize.STRING
		}, // text not null, -- 
		
		ciiu_codigo_v3:{
			type: Sequelize.STRING
		}, // text, -- 
		ciiu_nombre_v3:{
			type: Sequelize.STRING
		}, // text -- 
	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}