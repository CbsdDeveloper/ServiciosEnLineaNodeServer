'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_brigadistas', {
		brigadista_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		brigadista_funcion: {
			type: Sequelize.STRING
		} // 

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}