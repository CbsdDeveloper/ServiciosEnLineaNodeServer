'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_poa', {
		poa_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		poa_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		poa_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		poa_periodo:{
			type: Sequelize.STRING
		}, //  text, -- 
		poa_descripcion:{
			type: Sequelize.STRING
		}, //  text, -- 

		poa_periodo_inicio: { 
			type: Sequelize.DATE
		}, // date, -- 
		poa_periodo_cierre: { 
			type: Sequelize.DATE
		}, // date, -- 

	}, {
		schema: 'planificacion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}