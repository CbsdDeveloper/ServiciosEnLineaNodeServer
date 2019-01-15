'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_usuarios', {
		usuario_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},

		usuario_login: Sequelize.STRING,
		usuario_pass: Sequelize.STRING,
		usuario_estado: {
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO'
		},
		usuario_acceso_correcto:{
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		usuario_acceso_fallido:{
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		usuario_cambio_perfil:{
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		usuario_cambiar_pass:{
			type: Sequelize.BOOLEAN,
			defaultValue: true
		},
		usuario_idioma:{
			type: Sequelize.STRING,
			defaultValue: 'es'
		},
		usuario_webmail_user: Sequelize.STRING,
		usuario_webmail_pass: Sequelize.STRING,
		usuario_registro: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}, {
		schema: 'admin',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}