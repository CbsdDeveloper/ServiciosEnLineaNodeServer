'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_tiposcontratos', {
		tcontrato_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		tcontrato_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		tcontrato_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		tcontrato_nombre: { 
			type: Sequelize.STRING
		}, // text not null, -- NOMBRE DE CONTRATO
		tcontrato_detalle: { 
			type: Sequelize.STRING 
		} // text, -- DETALLE
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}