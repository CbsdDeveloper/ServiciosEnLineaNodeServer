'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_biometrico_marcaciones', {
		marcacion_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		marcacion_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- 
		marcacion_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'REGISTRADO' 
		}, // text default 'CORRECTO'::text, -- CORRECTO, REVISION, ANULADO
	
		fk_biometrico_id: {
			type: DataTypes.INTEGER
		}, // int not null, --
	
		fk_periodo_id: {
			type: DataTypes.INTEGER
		}, // int not null, --
	
		marcacion_ingreso_sistema: { 
			type: DataTypes.STRING
		}, //  text, -- HORA DE ENTRADA - SISTEMA
		marcacion_ingreso: { 
			type: DataTypes.STRING
		}, //  text, -- HORA DE ENTRADA - PERSONAL
		marcacion_ingreso_extras: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- MINUTOS ANTES O DESPUES
		
		marcacion_salida_sistema: { 
			type: DataTypes.STRING
		}, // text, -- HORA DE ENTRADA - SISTEMA
		marcacion_salida: { 
			type: DataTypes.STRING
		}, // text, -- HORA DE ENTRADA - PERSONAL
		marcacion_salida_extras: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- MINUTOS ANTES O DESPUES
		
		marcacion_ingreso_break_sistema: { 
			type: DataTypes.STRING
		}, // text, -- HORA DE ENTRADA - SISTEMA
		marcacion_ingreso_break: { 
			type: DataTypes.STRING
		}, // text, -- HORA DE ENTRADA - PERSONAL
		marcacion_ingreso_break_extras: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- MINUTOS ANTES O DESPUES
		
		marcacion_salida_break_sistema: { 
			type: DataTypes.STRING
		}, // text, -- HORA DE ENTRADA - SISTEMA
		marcacion_salida_break: { 
			type: DataTypes.STRING
		}, // text, -- HORA DE ENTRADA - PERSONAL
		marcacion_salida_break_extras: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- MINUTOS ANTES O DESPUES
		
		marcacion_observacion: { 
			type: DataTypes.STRING
		}, // text, -- OBSERVACION DE ATRASO
		
		marcacion_rancho: { 
			type: DataTypes.DECIMAL(10,2),
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