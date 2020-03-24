'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('countries', {
		country_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		country_sortname:{
			type: DataTypes.STRING
		}, // varchar(3) NOT NULL,
		country_name:{
			type: DataTypes.STRING
		}, // text NOT NULL,
		
		country_nombre:{
			type: DataTypes.STRING
		}, // text,
		country_gentilicio:{
			type: DataTypes.STRING
		}, // text,
		country_iso3:{
			type: DataTypes.STRING
		} // text

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}