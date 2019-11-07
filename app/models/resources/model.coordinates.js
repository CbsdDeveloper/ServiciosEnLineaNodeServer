'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_coordenadas', {
		coordenada_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},

		coordenada_entidad:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default" NOT NULL,
		coordenada_entidad_id:{
			type: Sequelize.INTEGER
		}, // integer NOT NULL,
		coordenada_longitud:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",
		coordenada_latitud:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",
		coordenada_zoom:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default",
		coordenada_thumbnail:{
			type: Sequelize.STRING
		} // text COLLATE pg_catalog."default",

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}