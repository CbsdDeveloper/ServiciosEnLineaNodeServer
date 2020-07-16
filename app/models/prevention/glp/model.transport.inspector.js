'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_tglp_inspector', {

		tglpinspector_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,
		
	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});

	Model.removeAttribute('id');
	
	return Model;
};