'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_inspeccion_inspector', {

		inspeccioninspector_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		relacion_registro:{
			type: DataTypes.DATE
		}, // timestamp without time zone, -- FEHCA PROGRAMADA PARA INSPECCION
	
		inspector_tipo:{
			type: DataTypes.STRING
		}, // int default 0 -- NUMERO DE PISOS

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});

	// Model.removeAttribute('id');
	
	return Model;
}