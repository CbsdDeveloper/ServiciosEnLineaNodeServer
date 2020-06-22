'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_planesemergencia_inspector', {
		
	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});

	Model.removeAttribute('id');
	
	return Model;
}