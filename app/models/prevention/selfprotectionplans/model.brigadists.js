'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_brigadistas', {
		brigadista_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		brigadista_funcion: {
			type: DataTypes.STRING
		} // 

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}