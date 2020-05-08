'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_estaciones', {
		estacion_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		estacion_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		estacion_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		},
		
		estacion_nombre: { type: DataTypes.STRING },
		estacion_nombre_alterno: { type: DataTypes.STRING },
		
		estacion_parroquia: { type: DataTypes.STRING },
		estacion_principal: { type: DataTypes.STRING },
		estacion_secudaria: { type: DataTypes.STRING },
		estacion_longitud: { type: DataTypes.STRING },
		estacion_latitud: { type: DataTypes.STRING },
		estacion_imagen: { 
			type: DataTypes.STRING,
			defaultValue: 'default.png' 
		},
		estacion_telefono: { type: DataTypes.STRING },
		estacion_email: { type: DataTypes.STRING },
		estacion_construccion: { type: DataTypes.DATE }
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}