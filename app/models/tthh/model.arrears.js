'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_atrasos', {
		atraso_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		atraso_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		atraso_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		fk_personal_id: { 
			type: Sequelize.INTEGER
		}, // integer not null references tthh.tb_personal(personal_id), -- 
		
		atraso_fecha: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // date, -- 
		atraso_minutos: { 
			type: Sequelize.INTEGER
		}, // int, -- 
		atraso_detalle: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		} // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}