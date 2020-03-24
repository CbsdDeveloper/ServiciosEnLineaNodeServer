'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_entidadesfinancieras', {
		entidad_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		entidad_registro:{
			type: DataTypes.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		entidad_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		entidad_nombre:{
			type: DataTypes.STRING
		}, // text, -- 
		entidad_cuenta_bce:{
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