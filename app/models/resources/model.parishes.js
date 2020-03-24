'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('parishes', {
		parish_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		parrish_name:{
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