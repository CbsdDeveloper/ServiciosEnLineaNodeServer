'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_poa_proyectos', {
		proyecto_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		proyecto_registro:{
			type: Sequelize.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		proyecto_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		proyecto_nombre:{
			type: Sequelize.STRING
		}, //  text, -- 
		proyecto_objetivos:{
			type: Sequelize.STRING
		}, //  text, -- 
		proyecto_justificacion:{
			type: Sequelize.STRING
		}, //  text, -- 
		proyecto_meta:{
			type: Sequelize.STRING
		}, //  text, -- 
		proyecto_indicador:{
			type: Sequelize.STRING
		}, //  text, -- 

		proyecto_trimestre_i:{
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		}, //  text, -- 
		proyecto_trimestre_ii:{
			type: Sequelize.STRING,
			defaultValue: 'NO'
		}, //  text, -- 
		proyecto_trimestre_iii:{
			type: Sequelize.STRING,
			defaultValue: 'NO'
		}, //  text, -- 
		proyecto_trimestre_iv:{
			type: Sequelize.STRING,
			defaultValue: 'NO'
		}, //  text, -- 

		proyecto_trimestre_i_porcentaje: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- JERARQUIA DEL PUESTO
		proyecto_trimestre_ii_porcentaje: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- JERARQUIA DEL PUESTO
		proyecto_trimestre_iii_porcentaje: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- JERARQUIA DEL PUESTO
		proyecto_trimestre_iv_porcentaje: { 
			type: Sequelize.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- JERARQUIA DEL PUESTO
		
		proyecto_presupuesto: {
			type: Sequelize.DECIMAL(10,2),
			defaultValue: 0
		}, //  numeric(10,2) default 0, -- 
		proyecto_presupuesto_reformado: {
			type: Sequelize.DECIMAL(10,2),
			defaultValue: 0
		}, //  numeric(10,2) default 0, -- 
		proyecto_presupuesto_total: {
			type: Sequelize.DECIMAL(10,2),
			defaultValue: 0
		} //  numeric(10,2) default 0, -- 

	}, {
		schema: 'planificacion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}