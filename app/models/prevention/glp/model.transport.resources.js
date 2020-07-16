'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_transporte_has_recursos', {
		tglprecurso_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,
		
		recurso_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone default current_timestamp(0), -- REGISTRO DE MOVIMIENTO
		recurso_estado:{
			type: DataTypes.STRING
		}, // text default 'SI'::text -- SI=CUMPLE, NO=NO CUMPLE, NA=NO APLICA

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
};