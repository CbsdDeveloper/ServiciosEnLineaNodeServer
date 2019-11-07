'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_actividades', {
		actividad_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		actividad_estado:{
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		actividad_registro:{
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}, // timestamp without time zone default current_timestamp(0),
		
		actividad_codigo:{
			type: Sequelize.STRING
		}, // text not null, -- limit 4
		actividad_nombre:{
			type: Sequelize.STRING
		}, // text not null, -- NOMBRE DE MACROACTIVIDAD
		actividad_descripcion:{
			type: Sequelize.STRING
		}, // text, -- DESCRIPCIÓN
		actividad_color:{
			type: Sequelize.STRING
		} // text -- COLOR
	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}