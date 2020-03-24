'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_poa', {
		poa_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		poa_registro:{
			type: DataTypes.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		poa_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		poa_periodo:{
			type: DataTypes.STRING
		}, //  text, -- 
		poa_descripcion:{
			type: DataTypes.STRING
		}, //  text, -- 

		poa_periodo_inicio: { 
			type: DataTypes.DATE
		}, // date, -- 
		poa_periodo_cierre: { 
			type: DataTypes.DATE
		}, // date, -- 

	}, {
		schema: 'planificacion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}