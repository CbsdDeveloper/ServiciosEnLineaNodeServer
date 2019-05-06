'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_medicamentos', {
		medicamento_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		medicamento_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		medicamento_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		fk_personal_id: { 
			type: Sequelize.INTEGER
		}, // integer not null references tthh.tb_personal(personal_id), -- 
		
		medicamento_codigo: { 
			type: Sequelize.STRING
		}, // text not null,
	
		medicamento_presentacion: { 
			type: Sequelize.STRING
		}, // text not null, -- UNIDAD, TABLETAS, FRASCO, AMPOLLA, FUNDA, COMPRIMIDO MASTICABLE, TUBO
		medicamento_nombre: { 
			type: Sequelize.STRING
		}, // text not null, -- 
		medicamento_generico: { 
			type: Sequelize.STRING
		} // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}