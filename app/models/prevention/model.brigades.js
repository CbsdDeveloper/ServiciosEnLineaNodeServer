'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_brigadas', {
		brigada_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		brigada_nombre:{
			type: DataTypes.STRING
		}, // 
		brigada_funcion: { 
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