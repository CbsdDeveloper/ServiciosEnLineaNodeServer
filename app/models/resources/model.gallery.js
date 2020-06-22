'use strict';
module.exports = (sequelize, DataTypes) => {
	const Gallery = sequelize.define('tb_gallery', {
		media_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		media_registro: { 
			type: DataTypes.DATE
		}, // timestamp without time zone default current_timestamp(0), -- fecha de registro
		
		fk_table:{
			type: DataTypes.STRING
		}, // text not null, -- nombre de entidad relacionado
		fk_id:{
			type: DataTypes.INTEGER
		}, // int not null, -- serial por cada año
		
		media_tipo:{
			type: DataTypes.STRING,
			defaultValue: 'IMAGE'
		}, // text default 'IMAGE'::text, -- tipo de archivo
		media_nombre:{
			type: DataTypes.STRING
		}, // text, -- nombre del archivo (GENERADO POR PHP)
		media_titulo:{
			type: DataTypes.STRING
		}, // text, -- tema del archivo
		
		media_descripcion:{
			type: DataTypes.STRING
		}, // text -- descripción del archivo

	}, {
		schema: 'resources',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Gallery;
}