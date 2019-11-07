'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('cities', {
		city_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		city_name:{
			type: Sequelize.STRING
		} // varchar(30) NOT NULL,
	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}