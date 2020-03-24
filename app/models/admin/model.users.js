'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_usuarios', {
		usuario_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},

		usuario_login: DataTypes.STRING,
		usuario_pass: DataTypes.STRING,
		usuario_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		},
		usuario_acceso_correcto:{
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		usuario_acceso_fallido:{
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		usuario_cambio_perfil:{
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		usuario_cambiar_pass:{
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		usuario_idioma:{
			type: DataTypes.STRING,
			defaultValue: 'es'
		},
		usuario_webmail_user: DataTypes.STRING,
		usuario_webmail_pass: DataTypes.STRING,
		usuario_registro: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	}, {
		schema: 'admin',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}