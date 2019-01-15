'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('towns', {
		town_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		town_name:{
			type: Sequelize.STRING
		} // text NOT NULL,
	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}