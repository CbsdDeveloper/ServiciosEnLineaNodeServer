'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_actividades', {
		actividad_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		actividad_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		actividad_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		
		actividad_codigo:{
			type: DataTypes.STRING
		}, // text not null, -- limit 4
		actividad_nombre:{
			type: DataTypes.STRING
		}, // text not null, -- NOMBRE DE MACROACTIVIDAD
		actividad_descripcion:{
			type: DataTypes.STRING
		}, // text, -- DESCRIPCIÓN
		actividad_color:{
			type: DataTypes.STRING
		} // text -- COLOR
	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}