'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_catalogogeneralcuentas', {
		cuenta_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		cuenta_registro:{
			type: DataTypes.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		cuenta_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		cuenta_codigo:{
			type: DataTypes.STRING
		}, // text, -- 
		cuenta_descripcion:{
			type: DataTypes.STRING
		}, // text, -- 
		cuenta_nivel:{
			type: DataTypes.INTEGER
		}, // int default 1, -- 
		cuenta_movimiento:{
			type: DataTypes.INTEGER
		}, // int default 1, -- 
		cuenta_ppcredito:{
			type: DataTypes.STRING
		}, // text, -- 
		cuenta_ppdebito:{
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