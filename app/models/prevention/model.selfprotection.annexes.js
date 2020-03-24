'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_autoproteccion_anexos', {
		anexo_id: {
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,
		
		anexo_tipo:{
			type: DataTypes.STRING
		}, // text, -- TIPO DE ARCHIVO
		
		anexo_clasificacion:{
			type: DataTypes.STRING
		}, // text default 'RECURSOS DEL SISTEMA CONTRA INCENDIOS'::text, -- RECURSOS DEL SISTEMA CONTRA INCENDIOS, ANEXO
		anexo_nombre:{
			type: DataTypes.STRING
		}, // text not null, -- NOMBRE DEL ANEXO
		anexo_descripcion:{
			type: DataTypes.STRING
		}, // text, -- NOMBRE DEL ANEXO
		
		anexo_adjunto:{
			type: DataTypes.STRING
		} // text -- NOMBRE DEL ANEXO

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}