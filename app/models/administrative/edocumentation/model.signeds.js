'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_documentacion_electronica_firmas', {
		firma_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		firma_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		firma_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ENVIADO' 
		}, // text default 'ACTIVO'::text, -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}