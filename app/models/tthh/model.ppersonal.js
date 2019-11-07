'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_personal_puestos', {
		ppersonal_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		ppersonal_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		ppersonal_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'EN FUNCIONES' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		personal_definicion: { 
			type: Sequelize.STRING,
			defaultValue: 'TITULAR' 
		}, // text DEFAULT 'TITULAR'::text, -- PERSONAL TITULAR O ENCARGADO
	
		personal_contrato: { 
			type: Sequelize.STRING,
			defaultValue: 'CONTRATO OCASIONAL' 
		}, // text default 'CONTRATO OCASIONAL'::text, -- TIPO DE CONTRATO: NOMBRAMIENTO, NOMBREMIENTO PROVISIONAL, CONTRATO OCASIONAL, CONTRATO CIVIL
		personal_fecha_ingreso: { 
			type: Sequelize.DATE
		}, // date, -- FECHA DE INGRESO A LA INSTITUCION
		personal_fecha_salida: { 
			type: Sequelize.DATE
		}, // date, -- FECHA DE SALIDA
		personal_fecha_registro: { 
			type: Sequelize.DATE
		}, // date, -- FECHA DE ACTUALIZACIÓN
		personal_motivo_salida: { 
			type: Sequelize.STRING
		}, // text, -- MOTIVO DE SALIDA
		personal_observacion: { 
			type: Sequelize.STRING
		}, // text, -- OBSERVACIONES
		
		personal_baselegal: { 
			type: Sequelize.STRING
		}, // text, -- DOCUMENTO / BASE LEGAL DE MOVIMIENTO
		personal_regimen_laboral: { 
			type: Sequelize.STRING,
			defaultValue: 'LOSEP' 
		} // text default 'LOSEP'::text -- REGIMEN LABORAL AL QUE SE APEGAN
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}