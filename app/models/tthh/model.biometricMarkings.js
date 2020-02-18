'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_biomertico_marcaciones', {
		marcacion_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		marcacion_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- 
		marcacion_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'REGISTRADO' 
		}, // text default 'CORRECTO'::text, -- CORRECTO, REVISION, ANULADO
	
		fk_biometrico_id: {
			type: Sequelize.INTEGER
		}, // int not null, --
	
		fk_periodo_id: {
			type: Sequelize.INTEGER
		}, // int not null, --
	
		marcacion_ingreso_sistema: { 
			type: Sequelize.STRING
		}, //  text, -- HORA DE ENTRADA - SISTEMA
		marcacion_ingreso: { 
			type: Sequelize.STRING
		}, //  text, -- HORA DE ENTRADA - PERSONAL
		marcacion_ingreso_extras: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, -- MINUTOS ANTES O DESPUES
		
		marcacion_salida_sistema: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA - SISTEMA
		marcacion_salida: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA - PERSONAL
		marcacion_salida_extras: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, -- MINUTOS ANTES O DESPUES
		
		marcacion_ingreso_break_sistema: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA - SISTEMA
		marcacion_ingreso_break: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA - PERSONAL
		marcacion_ingreso_break_extras: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, -- MINUTOS ANTES O DESPUES
		
		marcacion_salida_break_sistema: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA - SISTEMA
		marcacion_salida_break: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA - PERSONAL
		marcacion_salida_break_extras: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, -- MINUTOS ANTES O DESPUES
		
		marcacion_observacion: { 
			type: Sequelize.STRING
		}, // text, -- OBSERVACION DE ATRASO
		
		marcacion_rancho: { 
			type: Sequelize.DECIMAL(10,2),
			defaultValue: 0
		}, // numeric(6,2) default 0 -- VALOR A CANCELAR POR RANCHO
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}