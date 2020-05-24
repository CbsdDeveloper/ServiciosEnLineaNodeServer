'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_autoinspecciones', {
		autoinspeccion_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		autoinspeccion_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		autoinspeccion_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		
		autoinspeccion_fecha:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),	-- FECHA DE GENERACIÓN AUTOINSPECCION
		autoinspeccion_codigo:{
			type: DataTypes.STRING
		} // text	-- CODIGO DE AUTOINSPECCION

	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}