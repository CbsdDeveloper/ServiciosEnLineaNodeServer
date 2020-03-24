'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_georeferenciacion', {
		mapa_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},

		mapa_entidad:{
			type: DataTypes.STRING
		}, // text COLLATE pg_catalog."default" NOT NULL,
		mapa_entidad_id:{
			type: DataTypes.INTEGER
		}, // integer NOT NULL,
		mapa_geojson_id:{
			type: DataTypes.INTEGER
		}, // integer,
		mapa_geojson:{
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