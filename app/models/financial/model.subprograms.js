'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_subprogramasfinancieros', {
		subprograma_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		subprograma_registro:{
			type: DataTypes.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		subprograma_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		subprograma_codigo:{
			type: DataTypes.STRING
		}, // text, -- 
		subprograma_descripcion:{
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