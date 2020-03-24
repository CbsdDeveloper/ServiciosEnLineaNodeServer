'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_proyectosfinancieros', {
		proyecto_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		proyecto_registro:{
			type: DataTypes.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		proyecto_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		proyecto_codigo:{
			type: DataTypes.STRING
		}, // text, -- 
		proyecto_descripcion:{
			type: DataTypes.STRING
		} // text -- 

	}, {
		schema: 'financiero',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}