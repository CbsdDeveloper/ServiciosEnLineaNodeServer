'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_reglamentos', {
		reglamento_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},

		reglamento_registro:{
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}, // timestamp without time zone default current_timestamp(0),
		reglamento_estado:{
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text, -- ACTIVO, SUSPENDIDO
		fk_usuario_id:{
			type: Sequelize.INTEGER
		}, // int references admin.tb_usuarios(usuario_id),
		
		titulo_id:{
			type: Sequelize.INTEGER
		}, // int not null references resources.tb_secciones_reglamentos(seccion_id),
		capitulo_id:{
			type: Sequelize.INTEGER
		}, // int references resources.tb_secciones_reglamentos(seccion_id),
		reglamento_clasificacion:{
			type: Sequelize.STRING
		}, // text not null, -- LOSEP, REGLAMENTO
		
		reglamento_articulo:{
			type: Sequelize.STRING
		}, // text not null, -- TEMA DE ARTÍCULO
		reglamento_descripcion:{
			type: Sequelize.STRING
		} // text -- DESCRIPCIÓN DE ARTÍCULO
	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}