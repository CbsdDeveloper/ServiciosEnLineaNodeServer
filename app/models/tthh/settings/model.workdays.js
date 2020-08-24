'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_jornadas_trabajo', {
		jornada_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, 
		
		jornada_registro: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		jornada_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		jornada_nombre: { 
			type: DataTypes.STRING
		}, // text not null, -- NOMBRE DE JORNADAS

		jornada_diasminimo: { 
			type: DataTypes.INTEGER
		}, //
		jornada_diasmaximo: { 
			type: DataTypes.INTEGER
		}, //

	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}