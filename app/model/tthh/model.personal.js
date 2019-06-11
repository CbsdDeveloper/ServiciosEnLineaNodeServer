'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_personal', {
		personal_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		personal_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- FECHA DE MOVIMIENTO
		personal_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'EN FUNCIONES' 
		}, // text default 'ACTIVO'::text, -- ESTADOS DE REGISTROS
		
		fk_usuario_id: { 
			type: Sequelize.INTEGER
		}, // int references admin.tb_usuarios(usuario_id), -- USUARIO RESPONSABLE
		
		fk_persona_id: { 
			type: Sequelize.INTEGER
		}, // int not null references resources.tb_personas(persona_id), -- RELACION CON REGISTRO DE PERSONAS
		fk_estacion_id: { 
			type: Sequelize.INTEGER
		}, // int references tthh.tb_estaciones(estacion_id), -- RELACION CON ESTACIONES
		
		personal_contrasenia: { 
			type: Sequelize.STRING
		}, // text, -- CONTRASEÑA DE ACCESO A LOS MÓDULOS
		personal_cambiar_pass: { 
			type: Sequelize.STRING,
			defaultValue: 'SI'
		}, // text DEFAULT 'SI'::text, -- SOLICITAR EL CAMBIO DE CONTRASEÑA
		personal_notificar_acceso_exitoso: { 
			type: Sequelize.BOOLEAN,
			defaultValue: FALSE
		}, // boolean DEFAULT false, -- NOTIFICAR INGRESO AL SISTEMA
		personal_notificar_acceso_fallido: { 
			type: Sequelize.BOOLEAN,
			defaultValue: FALSE
		}, // boolean DEFAULT false, -- NOTIFICAR AUTENTICACIÓN FALLIDA
		personal_notificar_cambios_perfil: { 
			type: Sequelize.BOOLEAN,
			defaultValue: FALSE
		}, // boolean DEFAULT false, -- NOTIFICAR CAMBIOS EN PERFIL
		personal_notificar_permisos: { 
			type: Sequelize.BOOLEAN,
			defaultValue: FALSE
		}, // DEFAULT false, -- NOTIFICAR SOLICITUD DE PERMISOS
		personal_notificar_eventos: { 
			type: Sequelize.BOOLEAN,
			defaultValue: FALSE
		}, // boolean DEFAULT false, -- NOTIFICAR EVENTOS INSTITUCIONALES
		
		personal_correo_institucional: { 
			type: Sequelize.STRING
		}, // text, -- CORREO INSTITUCIONAL
		biometrico_id: { 
			type: Sequelize.INTEGER
		}, // int not null default 0, -- REGISTRO DE BIOMETRICO
		
		fk_jornada_id: { 
			type: Sequelize.INTEGER
		} // int references tthh.tb_jornadas_trabajo(jornada_id) -- JORNADA DE TRABAJO
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}