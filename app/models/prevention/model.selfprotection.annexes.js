'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_autoproteccion_anexos', {
		anexo_id: {
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		}, // serial primary key,
		
		anexo_tipo:{
			type: Sequelize.STRING
		}, // text, -- TIPO DE ARCHIVO
		
		anexo_clasificacion:{
			type: Sequelize.STRING
		}, // text default 'RECURSOS DEL SISTEMA CONTRA INCENDIOS'::text, -- RECURSOS DEL SISTEMA CONTRA INCENDIOS, ANEXO
		anexo_nombre:{
			type: Sequelize.STRING
		}, // text not null, -- NOMBRE DEL ANEXO
		anexo_descripcion:{
			type: Sequelize.STRING
		}, // text, -- NOMBRE DEL ANEXO
		
		anexo_adjunto:{
			type: Sequelize.STRING
		} // text -- NOMBRE DEL ANEXO

	}, {
		schema: 'prevencion',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}