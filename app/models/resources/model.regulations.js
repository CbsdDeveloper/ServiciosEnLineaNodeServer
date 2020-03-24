'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_reglamentos', {
		reglamento_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},

		reglamento_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		reglamento_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text, -- ACTIVO, SUSPENDIDO
		fk_usuario_id:{
			type: DataTypes.INTEGER
		}, // int references admin.tb_usuarios(usuario_id),
		
		titulo_id:{
			type: DataTypes.INTEGER
		}, // int not null references resources.tb_secciones_reglamentos(seccion_id),
		capitulo_id:{
			type: DataTypes.INTEGER
		}, // int references resources.tb_secciones_reglamentos(seccion_id),
		reglamento_clasificacion:{
			type: DataTypes.STRING
		}, // text not null, -- LOSEP, REGLAMENTO
		
		reglamento_articulo:{
			type: DataTypes.STRING
		}, // text not null, -- TEMA DE ARTÍCULO
		reglamento_descripcion:{
			type: DataTypes.STRING
		} // text -- DESCRIPCIÓN DE ARTÍCULO
	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}