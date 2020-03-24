'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_webmail', {
		webmail_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		webmail_name: {
			type: DataTypes.STRING 
		}, // text, -- nombre de webmail
		webmail_host: {
			type: DataTypes.STRING 
		}, // text, -- host de servidor, webmail
		webmail_puerto: {
			type: DataTypes.STRING 
		}, // text, -- puerto de conexion, webmail
		webmail_seguridad: {
			type: DataTypes.STRING 
		}, // text, -- parámetro de seguridad - tls, ssl
		webmail_usuario: {
			type: DataTypes.STRING 
		}, // text, -- nombre de usuario de correo, webmail
		webmail_mail: {
			type: DataTypes.STRING 
		}, // text, -- email de webmail
		webmail_pass: {
			type: DataTypes.STRING 
		} // text -- contraseña de webmail
		
	}, {
		schema: 'admin',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}