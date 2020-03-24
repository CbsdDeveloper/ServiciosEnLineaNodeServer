'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_consultasmedicas', {
		consulta_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		consulta_registro: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		consulta_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		

		// fk_historiaclinica_id integer not null references tthh.tb_historiasclinicas(historia_id), -- PERSONAL RESPONSABLE
		// fk_doctor_id integer not null references tthh.tb_personal_puestos(ppersonal_id), -- RESPONSABLE DE REALIZAR LA CONSULTA
		
		consulta_serie: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0,
		consulta_fecha_consulta: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		
		consulta_motivo: { 
			type: DataTypes.STRING
		}, // text, -- 
		consulta_antecedentes: { 
			type: DataTypes.STRING
		}, // text, -- 
		consulta_enfermedad_actual: { 
			type: DataTypes.STRING
		}, // text, -- 
		consulta_revision_organos: { 
			type: DataTypes.STRING
		}, // text, -- 
		consulta_examen_fisico: { 
			type: DataTypes.STRING
		}, // text, -- 
		consulta_planes: { 
			type: DataTypes.STRING
		}, // text, -- 
		
		consulta_peso: { 
			type: DataTypes.DECIMAL(5,2),
		}, // numeric(5,2), -- 
		consulta_estatura: { 
			type: DataTypes.DECIMAL(5,2),
		}, // numeric(5,2), -- 
		consulta_ta: { 
			type: DataTypes.STRING
		}, // integer, -- 
		consulta_fc: { 
			type: DataTypes.STRING
		}, // integer, -- 
		consulta_fr: { 
			type: DataTypes.STRING
		}, // integer, -- 
		consulta_so2: { 
			type: DataTypes.STRING
		}, // text, -- P/T2
		consulta_imc: { 
			type: DataTypes.DECIMAL(5,2),
		}, // numeric(5,2), -- P/T2
		consulta_temperatura: { 
			type: DataTypes.DECIMAL(5,2),
		}, // numeric(5,2), -- P/T2
		
		consulta_observaciones: { 
			type: DataTypes.STRING
		}, // text, -- 
		
		// CITA SUBSECUENTE
		consulta_cita_subsecuente: { 
			type: DataTypes.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::TEXT, -- 
		consulta_cita_fecha: {
			type: DataTypes.DATE
		}, // date, -- 
		consulta_cita_notificado: { 
			type: DataTypes.STRING,
			defaultValue: 'AGENDADA' 
		}, // text default 'AGENDADA'::TEXT, -- AGENDADA, NOTIFICADA, ATENDIDA
		consulta_cita_indicaciones: {
			type: DataTypes.DATE
		}, // date, -- 
		
		// ANTECEDENTES PATOLOGICOS
		historia_app: { 
			type: DataTypes.STRING
		}, // text, -- 
		historia_apf: { 
			type: DataTypes.STRING
		}, // text, -- 
		historia_aqx: { 
			type: DataTypes.STRING
		}, // text, -- 
		historia_aobstetricos: { 
			type: DataTypes.STRING
		}, // text, -- 
		historia_alergias: { 
			type: DataTypes.STRING
		}, // text, -- 
		// MUJERES
		historia_menarquia: { 
			type: DataTypes.STRING
		}, // text, -- 
		historia_gestas: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		historia_partos: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		historia_abortos: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		}, // int default 0, -- 
		historia_otros: { 
			type: DataTypes.STRING
		}, // text, -- 
		// ACTUALIZACION DE HISTORIA MEDICA
		historia_actualizar: { 
			type: DataTypes.STRING,
			defaultValue: 'NO' 
		}, // text DEFAULT 'NO'::text, -- 
		consulta_fum: { 
			type: DataTypes.STRING
		}, // text, -- 

		// DESCANSO MEDICO
		consulta_descansomedico: { 
			type: DataTypes.STRING,
			defaultValue: 'NO' 
		}, // text default 'NO'::text, -- 
		consulta_descansomedico_desde: { 
			type: DataTypes.STRING
		}, // text, -- 
		consulta_descansomedico_hasta: { 
			type: DataTypes.STRING
		}, // text, -- 
		consulta_descansomedico_indicaciones: { 
			type: DataTypes.STRING
		}, // text, -- 

		// MEDICAMENTOS
		consulta_medicamento: { 
			type: DataTypes.STRING,
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