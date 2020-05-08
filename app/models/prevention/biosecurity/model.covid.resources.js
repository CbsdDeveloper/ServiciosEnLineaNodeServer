'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_covid19_recursos', {
		formulario_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,
	
		formulario_aplicacion: {
			type: DataTypes.STRING
		}, // text default 'NO APLICA'::text, -- 
		formulario_descripcion: {
			type: DataTypes.STRING
		}, // text, -- 
		formulario_descripcion_prevencion: {
			type: DataTypes.STRING
		} // text -- 

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}