'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_temario', {
		tema_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		tema_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
		tema_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text COLLATE pg_catalog."default" DEFAULT 'PENDIENTE'::text,
		
		tema_nombre:{
			type: DataTypes.STRING
		}, // text not null, -- TEMA DE CAPACITACION
		tema_descripcion:{
			type: DataTypes.STRING
		}, // text, -- DESCRIPCION DE TEMA
		tema_recursos:{
			type: DataTypes.STRING
		}, // text -- LISTA DE RECURSOS

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}