'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_evaluacionpersonal_respuestas', {
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
		}, // text, -- 
		respuesta_puntuacion: { 
			type: DataType.INTEGER
		} // text, -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}