'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_recursos', {
		recurso_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		recurso_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		recurso_estado:{
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO'
		}, // text default 'ACTIVO'::text, -- ACTIVO, ELIMINADO
		
		recurso_clasificacion:{
			type: DataTypes.STRING,
			defaultValue: 'default.png'
		}, // text, -- TIPO DE RECURSO: AUTODECLARACION, PLAN DE AUTOPROTECCION
		
		recurso_nombre:{
			type: DataTypes.STRING,
			defaultValue: 'default.png'
		}, // text not null, -- NOMBRE DE RECURSO
		recurso_descripcion:{
			type: DataTypes.STRING
		}, // text, -- DESCRIPCION DE RECURSO
		
		recurso_imagen:{
			type: DataTypes.STRING,
			defaultValue: 'default.png'
		}, // text default 'default.png'::text, -- IMAGEN DE RECURSO
		recurso_icon_tipo:{
			type: DataTypes.STRING,
			defaultValue: 'fontawesome'
		}, // text default 'fontawesome'::text, -- TIPO DE ICONO
		recurso_icon:{
			type: DataTypes.STRING,
			defaultValue: 'info'
		}, // text default 'info'::text, -- ICONO DE RECURSO
		
		transporteglp:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, // text default 'NO'::TEXT, -- FILTRO PARA TRSNPORTE DE GLP
		reportes:{
			type: DataTypes.STRING,
			defaultValue: 'NO'
		}, // text default 'NO'::TEXT -- FILTRO PARA TRSNPORTE DE GLP

		recurso_clasificacion_prevencion:{
			type: DataTypes.STRING
		}, //
		recurso_tipo_formulario:{
			type: DataTypes.STRING
		}, //
		recurso_articulo:{
			type: DataTypes.STRING
		}, //
		recurso_unidad_medida:{
			type: DataTypes.STRING
		}, //
		recurso_lista_valores:{
			type: DataTypes.STRING
		} //

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}