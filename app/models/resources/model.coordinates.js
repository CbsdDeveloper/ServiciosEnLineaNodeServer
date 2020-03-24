'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_coordenadas', {
		coordenada_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},

		coordenada_entidad:{
			type: DataTypes.STRING
		}, // text COLLATE pg_catalog."default" NOT NULL,
		coordenada_entidad_id:{
			type: DataTypes.INTEGER
		}, // integer NOT NULL,
		coordenada_longitud:{
			type: DataTypes.STRING
		}, // text COLLATE pg_catalog."default",
		coordenada_latitud:{
			type: DataTypes.STRING
		}, // text COLLATE pg_catalog."default",
		coordenada_zoom:{
			type: DataTypes.STRING
		}, // text COLLATE pg_catalog."default",
		coordenada_thumbnail:{
			type: DataTypes.STRING
		} // text COLLATE pg_catalog."default",

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}