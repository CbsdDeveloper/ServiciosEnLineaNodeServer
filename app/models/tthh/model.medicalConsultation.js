'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_consultasmedicas', {
		consulta_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		consulta_registro: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		consulta_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		

		// fk_historiaclinica_id integer not null references tthh.tb_historiasclinicas(historia_id), -- PERSONAL RESPONSABLE
		// fk_doctor_id integer not null references tthh.tb_personal_puestos(ppersonal_id), -- RESPONSABLE DE REALIZAR LA CONSULTA
		
		consulta_serie: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0,
		consulta_fecha_consulta: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		
		consulta_motivo: { 
			type: Sequelize.STRING
		}, // text, -- 
		consulta_antecedentes: { 
			type: Sequelize.STRING
		}, // text, -- 
		consulta_enfermedad_actual: { 
			type: Sequelize.STRING
		}, // text, -- 
		consulta_revision_organos: { 
			type: Sequelize.STRING
		}, // text, -- 
		consulta_examen_fisico: { 
			type: Sequelize.STRING
		}, // text, -- 
		consulta_planes: { 
			type: Sequelize.STRING
		}, // text, -- 
		
		consulta_peso: { 
			type: Sequelize.DECIMAL(5,2),
		}, // numeric(5,2), -- 
		consulta_estatura: { 
			type: Sequelize.DECIMAL(5,2),
		}, // numeric(5,2), -- 
		consulta_ta: { 
			type: Sequelize.STRING
		}, // integer, -- 
		consulta_fc: { 
			type: Sequelize.STRING
		}, // integer, -- 
		consulta_fr: { 
			type: Sequelize.STRING
		}, // integer, -- 
		consulta_so2: { 
			type: Sequelize.STRING
		}, // text, -- P/T2
		consulta_imc: { 
			type: Sequelize.DECIMAL(5,2),
		}, // numeric(5,2), -- P/T2
		consulta_temperatura: { 
			type: Sequelize.DECIMAL(5,2),
		}, // numeric(5,2), -- P/T2
		
		consulta_observaciones: { 
			type: Sequelize.STRING
		}, // text, -- 
		
		// CITA SUBSECUENTE
		consulta_cita_subsecuente: { 
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::TEXT, -- 
		consulta_cita_fecha: {
			type: Sequelize.DATE
		}, // date, -- 
		consulta_cita_notificado: { 
			type: Sequelize.STRING,
			defaultValue: 'AGENDADA' 
		}, // text default 'AGENDADA'::TEXT, -- AGENDADA, NOTIFICADA, ATENDIDA
		consulta_cita_indicaciones: {
			type: Sequelize.DATE
		}, // date, -- 
		
		// ANTECEDENTES PATOLOGICOS
		historia_app: { 
			type: Sequelize.STRING
		}, // text, -- 
		historia_apf: { 
			type: Sequelize.STRING
		}, // text, -- 
		historia_aqx: { 
			type: Sequelize.STRING
		}, // text, -- 
		historia_aobstetricos: { 
			type: Sequelize.STRING
		}, // text, -- 
		historia_alergias: { 
			type: Sequelize.STRING
		}, // text, -- 
		// MUJERES
		historia_menarquia: { 
			type: Sequelize.STRING
		}, // text, -- 
		historia_gestas: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		historia_partos: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		historia_abortos: { 
			type: Sequelize.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		historia_otros: { 
			type: Sequelize.STRING
		}, // text, -- 
		// ACTUALIZACION DE HISTORIA MEDICA
		historia_actualizar: { 
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		}, // text DEFAULT 'NO'::text, -- 
		consulta_fum: { 
			type: Sequelize.STRING
		}, // text, -- 

		// DESCANSO MEDICO
		consulta_descansomedico: { 
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text, -- 
		consulta_descansomedico_desde: { 
			type: Sequelize.STRING
		}, // text, -- 
		consulta_descansomedico_hasta: { 
			type: Sequelize.STRING
		}, // text, -- 
		consulta_descansomedico_indicaciones: { 
			type: Sequelize.STRING
		}, // text, -- 

		// MEDICAMENTOS
		consulta_medicamento: { 
			type: Sequelize.STRING,
			defaultValue: 'NO' 
		} // text default 'NO'::text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}