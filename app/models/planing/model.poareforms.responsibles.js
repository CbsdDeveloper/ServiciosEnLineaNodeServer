'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_reformas_responsables', {
		responsable_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		responsable_registro:{
			type: DataTypes.DATE
		}, //  timestamp without time zone default current_timestamp(0), -- 
		responsable_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		responsable_funcion: {
			type: DataTypes.STRING
		}, // text -- DESCRIPCION DE REFORMA

	}, {
		schema: 'planificacion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}