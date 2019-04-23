'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_personas', {
		persona_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		persona_fingreso:{
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}, // timestamp without time zone default current_timestamp(0),
		fk_usuario_id:{
			type: Sequelize.INTEGER,
			references: {
				model: 'tb_usuarios',
				key: 'usuario_id'
			}
		}, // integer references admin.tb_usuarios(usuario_id),
		
		persona_tipo_doc:{
			type: Sequelize.STRING
		}, // text not null default 'cedula'::text, -- doocumento de identificación
		persona_doc_identidad:{
			type: Sequelize.STRING
		}, // text not null, -- doocumento de identificación
		persona_nombres:{
			type: Sequelize.STRING
		}, // text not null, -- nombres de la persona
		persona_apellidos:{
			type: Sequelize.STRING
		}, // text not null, -- apellidos de la persona
		
		persona_fnacimiento:{
			type: Sequelize.DATE
		}, // date,
		persona_lugarnacimiento:{
			type: Sequelize.STRING
		}, // text -- 
		
		persona_sexo:{
			type: Sequelize.STRING
		}, // text, -- HOMBRE, MUJER
		persona_estadocivil:{
			type: Sequelize.STRING
		}, // text, -- SOLTERO, CASADO, DIVORCIADO, VIUDO, SOLTERA, CASADA, DIVORCIADA, VIUDA
		persona_licenciaconducir:{
			type: Sequelize.STRING
		}, // text, -- 
		persona_tiposangre:{
			type: Sequelize.STRING
		}, // text, -- 
		persona_estatura:{
			type: Sequelize.STRING
		}, // text, -- m
		persona_peso:{
			type: Sequelize.STRING
		}, // text, -- kg
		persona_imagen:{
			type: Sequelize.STRING,
			defaultValue: 'default.png'
		}, // text default 'default.png'::text,
		
		persona_nacionalidad:{
			type: Sequelize.STRING,
			defaultValue: 'ECUATORIANA'
		}, // text DEFAULT 'ECUATORIANA'::text, -- 
		fk_parroquia_id:{
			type: Sequelize.INTEGER,
			references: {
				model: 'parishes',
				key: 'parish_id'
			}
		}, // integer references resources.parishes(parish_id),
		persona_direccion:{
			type: Sequelize.STRING
		}, // text, -- dirección de contacto
		persona_telefono:{
			type: Sequelize.STRING
		}, // text, -- teléfono de contacto
		persona_celular:{
			type: Sequelize.STRING
		}, // text, -- celular personal
		persona_correo:{
			type: Sequelize.STRING
		}, // text, -- correo de contacto
		
		persona_principal:{
			type: Sequelize.STRING
		}, // text, -- correo de contacto
		persona_secundaria:{
			type: Sequelize.STRING
		}, // text, -- correo de contacto
		persona_no_casa:{
			type: Sequelize.STRING
		}, // text, -- correo de contacto
		persona_referencia:{
			type: Sequelize.STRING
		}, // text, -- correo de contacto
		persona_barrio_ciudadela:{
			type: Sequelize.STRING
		}, // text, -- correo de contacto
		persona_barrio_sector:{
			type: Sequelize.STRING
		}, // text, -- correo de contacto
		
		persona_acerca:{
			type: Sequelize.STRING
		}, // text, -- 
		persona_destrezas:{
			type: Sequelize.STRING
		}, // text, -- 
		persona_alergias:{
			type: Sequelize.STRING
		}, // text, -- 
		persona_discapacidad:{
			type: Sequelize.STRING
		}, // text, -- 
		
		persona_etnia:{
			type: Sequelize.STRING
		}, // text, -- 
		persona_senialesparticulares:{
			type: Sequelize.STRING
		}, // text, -- 
		
		persona_titulo:{
			type: Sequelize.STRING
		} // text, -- 

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}