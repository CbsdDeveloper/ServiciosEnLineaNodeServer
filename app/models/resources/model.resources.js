'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_recursos', {
		recurso_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		recurso_registro:{
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}, // timestamp without time zone default current_timestamp(0),
		recurso_estado:{
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text, -- ACTIVO, ELIMINADO
		
		recurso_clasificacion:{
			type: Sequelize.STRING,
			defaultValue: 'default.png'
		}, // text, -- TIPO DE RECURSO: AUTODECLARACION, PLAN DE AUTOPROTECCION
		
		recurso_nombre:{
			type: Sequelize.STRING,
			defaultValue: 'default.png'
		}, // text not null, -- NOMBRE DE RECURSO
		recurso_descripcion:{
			type: Sequelize.STRING
		}, // text, -- DESCRIPCION DE RECURSO
		
		recurso_imagen:{
			type: Sequelize.STRING,
			defaultValue: 'default.png'
		}, // text default 'default.png'::text, -- IMAGEN DE RECURSO
		recurso_icon_tipo:{
			type: Sequelize.STRING,
			defaultValue: 'fontawesome'
		}, // text default 'fontawesome'::text, -- TIPO DE ICONO
		recurso_icon:{
			type: Sequelize.STRING,
			defaultValue: 'info'
		}, // text default 'info'::text, -- ICONO DE RECURSO
		
		transporteglp:{
			type: Sequelize.STRING,
			defaultValue: 'NO'
		}, // text default 'NO'::TEXT, -- FILTRO PARA TRSNPORTE DE GLP
		reportes:{
			type: Sequelize.STRING,
			defaultValue: 'NO'
		}, // text default 'NO'::TEXT -- FILTRO PARA TRSNPORTE DE GLP

		recurso_clasificacion_prevencion:{
			type: Sequelize.STRING
		}, //
		recurso_tipo_formulario:{
			type: Sequelize.STRING
		}, //
		recurso_articulo:{
			type: Sequelize.STRING
		}, //
		recurso_unidad_medida:{
			type: Sequelize.STRING
		}, //
		recurso_lista_valores:{
			type: Sequelize.STRING
		} //

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}