'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_tiposanticipos', {
		tanticipo_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		tanticipo_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		tanticipo_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		tanticipo_nombre: { 
			type: Sequelize.STRING
		}, // text not null, -- NOMBRE DE CONTRATO
		tanticipo_detalle: { 
			type: Sequelize.STRING 
		}, // text, -- DETALLE

		tanticipo_periodofiscal: { 
			type: Sequelize.STRING ,
			defaultValue: 'SI' 
		},  // text default 'SI'::text, -- AÑO FISCAL O CALENDARIO
		tanticipo_meses: { 
			type: Sequelize.INTEGER,
			defaultValue: 12
		}, // int default 12, -- MESES PARA SOLICITAR
		
		tanticipo_sueldoencargos: { 
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		},  // text default 'NO'::text, -- PERMITIR SUELDO DE ENCARGOS
		
		tanticipo_sueldominimo: { 
			type: Sequelize.INTEGER,
			defaultValue: 1
		}, // int default 1, -- SUELDO MINIMO
		tanticipo_sueldomaximo: { 
			type: Sequelize.INTEGER,
			defaultValue: 3
		} // int default 3 -- SUELDOS MAXIMO
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}