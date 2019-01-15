'use strict';
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('tb_formacionacademica', {
		formacion_id: { 
			type: Sequelize.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		formacion_registro: { 
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}, // timestamp without time zone default current_timestamp(0),
		formacion_estado: { 
			type: Sequelize.STRING,
			defaultValue: 'EN CURSO' 
		}, // text default 'EN CURSO'::text, -- EN CURSO, FINALIZADO
		
		formacion_institucion: { 
			type: Sequelize.STRING 
		}, // text not null, --
		formacion_nivel: { 
			type: Sequelize.STRING,
			defaultValue: 'TERCER NIVEL' 
		}, // text default 'TERCER NIVEL'::text, -- 
		formacion_titulo: { 
			type: Sequelize.STRING
		}, // text, -- titulo registrado o nombre de especialidad
		formacion_senescyt: { 
			type: Sequelize.STRING
		}, // text, -- registro de SENESCYT/M. EDUCACIÓN
		
		formacion_fingreso: { 
			type: Sequelize.DATE
		}, // date, -- fecha de inicio de estudio
		formacion_fsalida: { 
			type: Sequelize.DATE
		}, // date, -- fehca de culminación de estudios
		formacion_fregistro: { 
			type: Sequelize.DATE
		}, // date, -- FECHA DE REGISTRO EN SENESCYT/M. EDUCACIÓN
		formacion_pdf: { 
			type: Sequelize.STRING
		} // text
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}