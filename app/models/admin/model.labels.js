'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_labels', {
		label_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		label_key: {
			type: DataTypes.STRING 
		}, // text not null, -- variable de entorno
	
		label_module: {
			type: DataTypes.STRING 
		}, // text, -- MODULO O TIPO
		
		label_es: {
			type: DataTypes.STRING 
		}, // text, -- valor de variable 
		label_en: {
			type: DataTypes.STRING 
		} // text -- valor de variable 
		
	}, {
		schema: 'admin',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}