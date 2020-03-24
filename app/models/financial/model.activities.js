'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_actividadesfinancieras', {
		actividad_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		actividad_registro:{
			type: DataTypes.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		actividad_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		actividad_codigo:{
			type: DataTypes.STRING
		}, // text, -- 
		actividad_descripcion:{
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