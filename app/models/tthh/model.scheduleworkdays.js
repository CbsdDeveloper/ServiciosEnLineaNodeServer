'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_jornadashorario', {
		horario_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, 
		
		horario_dias_semana: { 
			type: Sequelize.STRING 
		}, // text, -- DIAS A LABORAR EN LA SEMANA: 5 - 3
		horario_horas_dia: { 
			type: Sequelize.INTEGER,
			defaultValue: 8
		}, // int not null default 8, -- HORAS AL DIA
		
		horario_entrada: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA
		horario_salida: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE SALIDA
		
		horario_break: { 
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text,
		horario_entrada_break: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA - BREAK
		horario_salida_break: { 
			type: Sequelize.STRING
		}, // text -- HORA DE SALIDA - BREAK

		horario_rancho: { 
			type: Sequelize.DECIMAL(10,2),
			defaultValue: 0
		} // text, -- HORA DE SALIDA - BREAK
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}