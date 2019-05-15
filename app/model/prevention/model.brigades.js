'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_brigadas', {
		brigada_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		brigada_nombre:{
			type: Sequelize.STRING
		}, // 
		brigada_funcion: { 
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