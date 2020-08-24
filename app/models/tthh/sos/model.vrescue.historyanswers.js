'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_rvertical_respuestas', {
		respuesta_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		respuesta_resultado: { 
			type: DataType.STRING 
		}, // text, -- 
		respuesta_comentario: { 
			type: DataType.STRING 
		}, // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}