'use strict';
module.exports = (sequelize, DataTypes) => {
	const Person = sequelize.define('tb_personas', {
		persona_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		persona_fingreso:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		fk_usuario_id:{
			type: DataTypes.INTEGER,
			references: {
				model: 'tb_usuarios',
				key: 'usuario_id'
			}
		}, // integer references admin.tb_usuarios(usuario_id),
		
		persona_tipo_doc:{
			type: DataTypes.STRING
		}, // text not null default 'cedula'::text, -- doocumento de identificación
		persona_doc_identidad:{
			type: DataTypes.STRING
		}, // text not null, -- doocumento de identificación
		persona_nombres:{
			type: DataTypes.STRING
		}, // text not null, -- nombres de la persona
		persona_apellidos:{
			type: DataTypes.STRING
		}, // text not null, -- apellidos de la persona
		
		persona_fnacimiento:{
			type: DataTypes.DATE
		}, // date,
		persona_lugarnacimiento:{
			type: DataTypes.STRING
		}, // text -- 
		
		persona_sexo:{
			type: DataTypes.STRING
		}, // text, -- HOMBRE, MUJER
		persona_estadocivil:{
			type: DataTypes.STRING
		}, // text, -- SOLTERO, CASADO, DIVORCIADO, VIUDO, SOLTERA, CASADA, DIVORCIADA, VIUDA
		persona_licenciaconducir:{
			type: DataTypes.STRING
		}, // text, -- 
		persona_tiposangre:{
			type: DataTypes.STRING
		}, // text, -- 
		persona_estatura:{
			type: DataTypes.STRING
		}, // text, -- m
		persona_peso:{
			type: DataTypes.STRING
		}, // text, -- kg
		persona_imagen:{
			type: DataTypes.STRING,
			defaultValue: 'default.png'
		}, // text default 'default.png'::text,
		
		persona_nacionalidad:{
			type: DataTypes.STRING,
			defaultValue: 'ECUATORIANA'
		}, // text DEFAULT 'ECUATORIANA'::text, -- 
		fk_parroquia_id:{
			type: DataTypes.INTEGER,
			references: {
				model: 'parishes',
				key: 'parish_id'
			}
		}, // integer references resources.parishes(parish_id),
		persona_direccion:{
			type: DataTypes.STRING
		}, // text, -- dirección de contacto
		persona_telefono:{
			type: DataTypes.STRING
		}, // text, -- teléfono de contacto
		persona_celular:{
			type: DataTypes.STRING
		}, // text, -- celular personal
		persona_correo:{
			type: DataTypes.STRING
		}, // text, -- correo de contacto
		
		persona_principal:{
			type: DataTypes.STRING
		}, // text, -- correo de contacto
		persona_secundaria:{
			type: DataTypes.STRING
		}, // text, -- correo de contacto
		persona_no_casa:{
			type: DataTypes.STRING
		}, // text, -- correo de contacto
		persona_referencia:{
			type: DataTypes.STRING
		}, // text, -- correo de contacto
		persona_barrio_ciudadela:{
			type: DataTypes.STRING
		}, // text, -- correo de contacto
		persona_barrio_sector:{
			type: DataTypes.STRING
		}, // text, -- correo de contacto
		
		persona_acerca:{
			type: DataTypes.STRING
		}, // text, -- 
		persona_destrezas:{
			type: DataTypes.STRING
		}, // text, -- 
		persona_alergias:{
			type: DataTypes.STRING
		}, // text, -- 
		persona_discapacidad:{
			type: DataTypes.STRING
		}, // text, -- 
		
		persona_etnia:{
			type: DataTypes.STRING
		}, // text, -- 
		persona_senialesparticulares:{
			type: DataTypes.STRING
		}, // text, -- 
		
		persona_titulo:{
			type: DataTypes.STRING
		}, // text, -- 

		
		persona_anexo_cedula:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, // text default 'NO'::text;
		persona_anexo_votacion:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, // text default 'NO'::text;


		persona_cemergencia_nombre:{
			type: DataTypes.STRING
		}, // text; -- 
		persona_cemergencia_parentesco:{
			type: DataTypes.STRING
		}, // text; -- 
		persona_cemergencia_direccion:{
			type: DataTypes.STRING
		}, // text; -- 
		persona_cemergencia_telefono:{
			type: DataTypes.STRING
		} // text; -- 

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Person;
}