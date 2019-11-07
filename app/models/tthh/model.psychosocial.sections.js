'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_formulariosriesgopsicosocial_secciones', {
		seccion_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		seccion_registro: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		seccion_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		seccion_nombre: { 
			type: Sequelize.STRING 
		}, // text not null, -- NOMBRE DE PUESTO
		seccion_index: { 
			type: Sequelize.INTEGER
		} // text not null, -- NOMBRE DE PUESTO
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}