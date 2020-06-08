'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_evaluacionespersonal_preguntas', {
		question_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}