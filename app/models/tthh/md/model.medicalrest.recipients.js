'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_certificadosmedicos_destinatarios', {
		destinatario_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		destinatario_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		} // timestamp without time zone default current_timestamp(0),
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}