'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_tasas', {
		tasa_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,

		tasa_estado:{
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text,
		tasa_registro:{
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}, // timestamp without time zone default current_timestamp(0),
		tasa_evento:{
			type: Sequelize.STRING,
			defaultValue: 'INGRESO'
		}, // text default 'INGRESO'::text,
		
		tasa_nombre:{
			type: Sequelize.STRING
		}, // text not null, -- 
		tasa_riesgobajo:{
			type: Sequelize.DECIMAL(5,2)
		}, // numeric (5,2), -- 
		tasa_riesgomoderado:{
			type: Sequelize.DECIMAL(5,2)
		}, // numeric (5,2), -- 
		tasa_riesgoalto:{
			type: Sequelize.DECIMAL(5,2)
		}, // numeric (5,2),
		tasa_codigo:{
			type: Sequelize.STRING
		}, // text
	}, {
		schema: 'permisos',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}