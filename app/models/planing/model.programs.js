'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_programas_poa', {
		programa_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		programa_registro:{
			type: DataTypes.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		programa_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		programa_nombre:{
			type: DataTypes.STRING
		}, //  text, -- 
		programa_descripcion:{
			type: DataTypes.STRING
		} //  text, -- 

	}, {
		schema: 'planificacion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}