'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_formulariosriesgopsicosocial_secciones', {
		seccion_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		seccion_registro: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		seccion_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		seccion_nombre: { 
			type: DataTypes.STRING 
		}, // text not null, -- NOMBRE DE PUESTO
		seccion_index: { 
			type: DataTypes.INTEGER
		} // text not null, -- NOMBRE DE PUESTO
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}