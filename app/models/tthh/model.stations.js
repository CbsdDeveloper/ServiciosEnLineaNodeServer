'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_estaciones', {
		estacion_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		estacion_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		estacion_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'ACTIVO' 
		},
		
		estacion_nombre: { type: Sequelize.STRING },
		estacion_nombre_alterno: { type: Sequelize.STRING },
		
		estacion_principal: { type: Sequelize.STRING },
		estacion_secudaria: { type: Sequelize.STRING },
		estacion_longitud: { type: Sequelize.STRING },
		estacion_latitud: { type: Sequelize.STRING },
		estacion_imagen: { 
			type: Sequelize.STRING,
			defaultValue: 'default.png' 
		},
		estacion_telefono: { type: Sequelize.STRING },
		estacion_email: { type: Sequelize.STRING },
		estacion_construccion: { type: Sequelize.DATE }
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}