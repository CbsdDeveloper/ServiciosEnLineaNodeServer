module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_usuarios', {
		usuario_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		fk_persona_id: Sequelize.INTEGER,
		fk_perfil_id: { 
			type: Sequelize.INTEGER,
			references: {
				model: tb_perfiles,
				key: 'perfil_id'
			}
		},
		usuario_login: Sequelize.text,
		usuario_pass: Sequelize.text,
		usuario_estado: {
			type: Sequelize.text,
			defaultValue: 'ACTIVO'
		},
		usuario_acceso_correcto:{
			type: Sequelize.boolean,
			defaultValue: false
		},
		usuario_acceso_fallido:{
			type: Sequelize.boolean,
			defaultValue: false
		},
		usuario_cambio_perfil:{
			type: Sequelize.boolean,
			defaultValue: false
		},
		fk_usuario_id: { 
			type: Sequelize.INTEGER,
			references: {
				model: tb_usuarios,
				key: 'usuario_id'
			}
		},
		usuario_cambiar_pass:{
			type: Sequelize.boolean,
			defaultValue: true
		},
		usuario_idioma:{
			type: Sequelize.text,
			defaultValue: 'es'
		},
		usuario_webmail_user: Sequelize.text,
		usuario_webmail_pass: Sequelize.text,
		usuario_registro: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}, {
		schema: 'admin'
	});
	
	return Model;
}