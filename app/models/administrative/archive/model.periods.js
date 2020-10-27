'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_archivo_periodos', {
		periodo_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		periodo_registro: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, //  timestamp without time zone default current_timestamp(0), -- 
		periodo_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ABIERTO' 
		}, // text default 'ACTIVO'::text, -- 
		
		periodo_nombre: {
			type: DataTypes.STRING
		}, // text , -- 
		
		
		periodo_inicio: {
			type: DataTypes.DATE
		}, // date, -- 
		periodo_cierre: {
			type: DataTypes.DATE
		}, // date, -- 
		
		periodo_descripcion: {
			type: DataTypes.STRING
		}, // text, -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}