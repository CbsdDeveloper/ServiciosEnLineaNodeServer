'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('states', {
		state_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		state_name:{
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