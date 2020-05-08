'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_archivo_clasificacion', {
		clasificacion_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		clasificacion_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, //  timestamp without time zone default current_timestamp(0), -- 
		clasificacion_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		clasificacion_nombre: {
			type: DataTypes.STRING
		}, // text not null, -- 
		clasificacion_descripcion: {
			type: DataTypes.STRING
		} // text

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}