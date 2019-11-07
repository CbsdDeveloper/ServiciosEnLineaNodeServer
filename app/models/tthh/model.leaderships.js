'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_direcciones', {
		direccion_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, 
		
		direccion_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		direccion_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		direccion_codigo: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text not null, -- SIGLAS DE DIRECCION
		direccion_nombre: { 
			type: Sequelize.STRING 
		}, // text not null, -- NOMBRE DE DIRECCION
		direccion_competencias: { 
			type: Sequelize.STRING 
		}, // text, -- COMPETENCIAS [HTML]
		
		direccion_fecha_creacion: { 
			type: Sequelize.DATE
		}, // date, -- FECHA DE CREACIÓN
		direccion_baselegal: { 
			type: Sequelize.STRING
		} // text -- DOCUMENTO / BASE LEGAL DE MOVIMIENTO
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}