'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_tiposanticipos', {
		tanticipo_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		tanticipo_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		tanticipo_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		tanticipo_nombre: { 
			type: DataTypes.STRING
		}, // text not null, -- NOMBRE DE CONTRATO
		tanticipo_detalle: { 
			type: DataTypes.STRING 
		}, // text, -- DETALLE

		tanticipo_periodofiscal: { 
			type: DataTypes.STRING ,
			defaultValue: 'SI' 
		},  // text default 'SI'::text, -- AÑO FISCAL O CALENDARIO
		tanticipo_meses: { 
			type: DataTypes.INTEGER,
			defaultValue: 12
		}, // int default 12, -- MESES PARA SOLICITAR
		
		tanticipo_sueldoencargos: { 
			type: DataTypes.STRING,
			defaultValue: 'NO' 
		},  // text default 'NO'::text, -- PERMITIR SUELDO DE ENCARGOS
		
		tanticipo_sueldominimo: { 
			type: DataTypes.INTEGER,
			defaultValue: 1
		}, // int default 1, -- SUELDO MINIMO
		tanticipo_sueldomaximo: { 
			type: DataTypes.INTEGER,
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