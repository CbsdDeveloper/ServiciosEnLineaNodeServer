'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_pelotones', {
		peloton_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		peloton_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		peloton_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		},
		
		peloton_nombre: { 
			type: DataTypes.STRING 
		}
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}