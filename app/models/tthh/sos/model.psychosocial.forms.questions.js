'use strict';
module.exports = (sequelize, DataType) => {
	const Model = sequelize.define('tb_formulariosriesgopsicosocial_preguntas', {
		pregunta_id: { 
			type: DataType.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		pregunta_registro: {
			type: DataType.DATE,
			defaultValue: DataType.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		pregunta_estado: { 
			type: DataType.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		pregunta_index: { 
			type: DataType.INTEGER 
		} // text not null, -- NOMBRE DE PUESTO
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}