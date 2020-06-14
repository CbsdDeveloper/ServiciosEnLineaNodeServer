'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_formulariosevaluaciones_preguntas', {
		pregunta_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		pregunta_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		pregunta_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text, -- ACTIVO, ELIMINADO
		
		pregunta_index:{
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, //
		pregunta_descripcion:{
			type: DataTypes.STRING
		}, // text, -- 
		pregunta_detalle:{
			type: DataTypes.STRING
		}, // text, -- 

		pregunta_seleccion_descripcion:{
			type: DataTypes.STRING
		}, // text, -- 
		
		pregunta_alerta:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, // text default 'NO'::text, -- 
		pregunta_alerta_respuesta:{
			type: DataTypes.STRING
		}, // text -- 

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}