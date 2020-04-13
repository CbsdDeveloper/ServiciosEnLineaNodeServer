'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_evaluacionesriesgopsicosocial_preguntas', {

	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}