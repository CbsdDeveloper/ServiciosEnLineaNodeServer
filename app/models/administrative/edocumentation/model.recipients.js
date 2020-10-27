'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_documentacion_electronica_destinatarios', {
		destinatario_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		destinatario_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		destinatario_estado: {
			type: DataTypes.STRING,
			defaultValue: 'RECIBIDO' 
		}, // text default 'ACTIVO'::text, -- 
		
		
		destinatario_fentregado:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0), -- 
		destinatario_fleido:{
			type: DataTypes.DATE
		}, // timestamp without time zone -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}