'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_georeferenciacion', {
		mapa_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},

		mapa_entidad:{
			type: Sequelize.STRING
		}, // text COLLATE pg_catalog."default" NOT NULL,
		mapa_entidad_id:{
			type: Sequelize.INTEGER
		}, // integer NOT NULL,
		mapa_geojson_id:{
			type: Sequelize.INTEGER
		}, // integer,
		mapa_geojson:{
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