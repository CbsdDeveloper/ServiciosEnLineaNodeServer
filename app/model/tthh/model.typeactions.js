'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_tipoacciones', {
		tipoaccion_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, 
		
		tipoaccion_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		tipoaccion_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		tipoaccion_codigo: { 
			type: Sequelize.STRING 
		}, // text not null, -- TEMA DE ARTÍCULO
		tipoaccion_nombre: { 
			type: Sequelize.STRING 
		}, // text not null, -- TEMA DE ARTÍCULO
		tipoaccion_descripcion: { 
			type: Sequelize.STRING
		}, // text -- DESCRIPCIÓN DE ARTÍCULO
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}