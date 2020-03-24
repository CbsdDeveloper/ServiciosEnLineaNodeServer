'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_tasas', {
		tasa_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		tasa_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		tasa_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		tasa_evento:{
			type: DataTypes.STRING,
			defaultValue: 'INGRESO'
		}, // text default 'INGRESO'::text,
		
		tasa_nombre:{
			type: DataTypes.STRING
		}, // text not null, -- 
		tasa_riesgobajo:{
			type: DataTypes.DECIMAL(5,2)
		}, // numeric (5,2), -- 
		tasa_riesgomoderado:{
			type: DataTypes.DECIMAL(5,2)
		}, // numeric (5,2), -- 
		tasa_riesgoalto:{
			type: DataTypes.DECIMAL(5,2)
		}, // numeric (5,2),
		tasa_codigo:{
			type: DataTypes.STRING
		}, // text
	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}