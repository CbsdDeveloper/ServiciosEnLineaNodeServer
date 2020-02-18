'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_jornadas_trabajo', {
		jornada_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, 
		
		jornada_registro: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		jornada_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		jornada_nombre: { 
			type: Sequelize.STRING
		} // text not null, -- NOMBRE DE JORNADAS

	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}