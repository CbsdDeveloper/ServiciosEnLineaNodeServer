'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_params', {
		param_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		param_key: {
			type: DataTypes.STRING 
		}, // text not null, -- variable de entorno
		param_value: {
			type: DataTypes.STRING 
		}, // text not null, -- valor de variable de entorno
		
		param_type: {
			type: DataTypes.STRING
		}, // text default 'text'::text, -- text, html, numeric
		param_name: {
			type: DataTypes.STRING
		}, // text not null, -- nombre real para presentar
		param_modulo: {
			type: DataTypes.STRING,
			defaultValue: 'MAIN'
		} // text default 'MAIN'::text -- nombre real para presentar

	}, {
		schema: 'admin',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}