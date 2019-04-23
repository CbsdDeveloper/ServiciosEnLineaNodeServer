'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_planesemergencia', {
		plan_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		plan_codigo:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",
		plan_registro: { 
			type: Sequelize.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		plan_estado:{
			type: Sequelize.STRING,
			defaultValue: 'PENDIENTE'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		plan_serie: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // integer DEFAULT 0,
		plan_solicitud:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",
		plan_elaborado: { 
			type: Sequelize.DATE
		}, // date,
		plan_caduca: { 
			type: Sequelize.DATE
		}, // date,
		plan_aprobado: { 
			type: Sequelize.DATE
		}, // timestamp without time zone,
		fk_inspector_id: { 
			type: Sequelize.INTEGER
		}, // integer,
		plan_observacion:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",
		plan_area: {
			type: Sequelize.DECIMAL(10,2)
		}, // numeric(10,2) NOT NULL DEFAULT 0,
		plan_aforo: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // integer DEFAULT 0,
		plan_plantas: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // integer DEFAULT 0,
		plan_clavecatastral:{
			type: Sequelize.STRING
		} // text COLLATE pg_catalog."default",

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}