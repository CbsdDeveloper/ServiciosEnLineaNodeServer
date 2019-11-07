'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('countries', {
		country_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		country_sortname:{
			type: Sequelize.STRING
		}, // varchar(3) NOT NULL,
		country_name:{
			type: Sequelize.STRING
		}, // text NOT NULL,
		
		country_nombre:{
			type: Sequelize.STRING
		}, // text,
		country_gentilicio:{
			type: Sequelize.STRING
		}, // text,
		country_iso3:{
			type: Sequelize.STRING
		} // text

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}