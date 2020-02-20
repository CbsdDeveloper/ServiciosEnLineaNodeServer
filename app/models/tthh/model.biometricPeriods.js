'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_biomertico_periodos', {
		periodo_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		periodo_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- 
		periodo_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'REVISION' 
		}, // text default 'CORRECTO'::text, -- CORRECTO, REVISION, ANULADO
		
		periodo_nombre: { 
			type: Sequelize.STRING
		}, // text not null,
		
		periodo_desde: { 
			type: Sequelize.DATE
		}, // date not null,
		periodo_hasta: { 
			type: Sequelize.DATE
		}, // date not null
		
		fk_registra: { 
			type: Sequelize.STRING
		}, // text not null,
		
		fk_aprueba: { 
			type: Sequelize.STRING
		} // text not null,
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}