'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('cities', {
		city_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		city_name:{
			type: DataTypes.STRING
		} // varchar(30) NOT NULL,
	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}