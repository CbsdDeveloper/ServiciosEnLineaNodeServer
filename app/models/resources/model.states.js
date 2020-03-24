'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('states', {
		state_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		state_name:{
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