'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_archivo_estanterias', {
		estanteria_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		estanteria_registro:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		estanteria_estado: {
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- 
		
		estanteria_nombre: {
			type: DataTypes.STRING
		}, // text not null, -- 
		
		estanteria_edificio: {
			type: DataTypes.STRING
		}, // text not null,
		estanteria_pasillo: {
			type: DataTypes.STRING
		}, // text, -- 
		estanteria_niveles: {
			type: DataTypes.INTEGER
		}, // int default 1, -- 
		estanteria_cajas_aproximado: {
			type: DataTypes.INTEGER
		} // int -- 

	}, {
		schema: 'logistica',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}