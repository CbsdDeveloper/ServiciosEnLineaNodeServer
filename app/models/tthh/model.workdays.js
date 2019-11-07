'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_jornadas_trabajo', {
		jornada_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, 
		
		jornada_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		jornada_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		jornada_nombre: { 
			type: Sequelize.STRING
		}, // text not null, -- NOMBRE DE JORNADAS
	
		jornada_dias_semana: { 
			type: Sequelize.INTEGER,
			defaultValue: 5
		}, // int not null default 5, -- DIAS A LABORAR EN LA SEMANA: 5 - 3
		jornada_horas_dia: { 
			type: Sequelize.INTEGER,
			defaultValue: 8
		}, // int not null default 8, -- NUMERO DE HORAS DIARIAS: 8 - 24
		jornada_intervalo_dia: { 
			type: Sequelize.INTEGER,
			defaultValue: 1
		}, // int not null default 1, -- INTERVALO DE DIAS PARA GENERAR HORARIO
		
		jornada_entrada: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA
		jornada_salida: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE SALIDA
		jornada_entrada_break: { 
			type: Sequelize.STRING
		}, // text, -- HORA DE ENTRADA - BREAK
		jornada_salida_break: { 
			type: Sequelize.STRING
		} // text, -- HORA DE SALIDA - BREAK
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}