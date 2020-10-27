'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_poa_proyectos', {
		proyecto_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		proyecto_registro:{
			type: DataTypes.STRING
		}, //  timestamp without time zone default current_timestamp(0), -- 
		proyecto_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		proyecto_codigo:{
			type: DataTypes.STRING
		}, //  text, -- 
		proyecto_nombre:{
			type: DataTypes.STRING
		}, //  text, -- 
		proyecto_objetivos:{
			type: DataTypes.STRING
		}, //  text, -- 
		proyecto_justificacion:{
			type: DataTypes.STRING
		}, //  text, -- 
		proyecto_observacion:{
			type: DataTypes.STRING
		}, //  text, -- 

		proyecto_meta:{
			type: DataTypes.STRING
		}, //  text, -- 
		proyecto_indicador:{
			type: DataTypes.STRING
		}, //  text, -- 

		proyecto_trimestre_i:{
			type: DataTypes.STRING,
			defaultValue: 'NO' 
		}, //  text, -- 
		proyecto_trimestre_ii:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, //  text, -- 
		proyecto_trimestre_iii:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, //  text, -- 
		proyecto_trimestre_iv:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, //  text, -- 

		proyecto_trimestre_i_porcentaje: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- JERARQUIA DEL PUESTO
		proyecto_trimestre_ii_porcentaje: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- JERARQUIA DEL PUESTO
		proyecto_trimestre_iii_porcentaje: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- JERARQUIA DEL PUESTO
		proyecto_trimestre_iv_porcentaje: { 
			type: DataTypes.INTEGER ,
			defaultValue: 0
		}, // int default 0, -- JERARQUIA DEL PUESTO
		
		proyecto_presupuesto: {
			type: DataTypes.DECIMAL(10,2),
			defaultValue: 0
		}, //  numeric(10,2) default 0, -- 
		proyecto_presupuesto_reformado: {
			type: DataTypes.DECIMAL(10,2),
			defaultValue: 0
		}, //  numeric(10,2) default 0, -- 
		proyecto_presupuesto_total: {
			type: DataTypes.DECIMAL(10,2),
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