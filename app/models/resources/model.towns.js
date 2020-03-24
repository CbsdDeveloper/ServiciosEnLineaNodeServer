'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('towns', {
		town_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		town_name:{
			type: DataTypes.STRING
		} // text NOT NULL,
	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}