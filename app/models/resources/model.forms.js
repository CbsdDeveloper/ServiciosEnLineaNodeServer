'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_formulariosevaluaciones', {
		formulario_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		formulario_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		formulario_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text, -- ACTIVO, ELIMINADO
		
		formulario_modulo:{
			type: DataTypes.STRING
		}, // text,
		formulario_tipo:{
			type: DataTypes.STRING
		}, // text, -- TEST COVID19, EVALUACION DE RIESGO PSICOSOCIAL
		formulario_nombre:{
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