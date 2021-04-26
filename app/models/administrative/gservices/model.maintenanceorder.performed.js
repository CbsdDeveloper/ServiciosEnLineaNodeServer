'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_mantenimiento_trabajos', {
		trabajo_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		trabajo_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		trabajo_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		trabajo_descripcion: {
			type: DataTypes.STRING
		}, // text DEFAULT 'PROFESIONAL TÉCNICO EN SERVICIOS GENERALES'::text, -- CARGO DEL RESPONSABLE

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}