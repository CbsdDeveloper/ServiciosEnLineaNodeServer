'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_formulariosevaluaciones_secciones', {
		seccion_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		seccion_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		seccion_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text, -- ACTIVO, ELIMINADO
		
		seccion_nombre:{
			type: DataTypes.STRING
		}, //
		seccion_index:{
			type: DataTypes.INTEGER
		} //

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}