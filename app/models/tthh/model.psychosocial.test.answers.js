'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_testriesgopsicosocial_respuestas', {
		
		respuesta_resultado: {
			type: DataType.STRING
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		respuesta_puntuacion: { 
			type: DataType.STRING
		} // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
	}, {
		schema: 'tthh',
		underscored: false,
		timestamps: false,
		freezeTableName: true
	});

	Model.removeAttribute('id');
	
	return Model;
}