'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_formacionacademica', {
		formacion_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
		
		formacion_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}, // timestamp without time zone default current_timestamp(0),
		formacion_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'FINALIZADO' 
		}, // text default 'EN CURSO'::text, -- EN CURSO, FINALIZADO
		
		formacion_institucion: { 
			type: DataTypes.STRING 
		}, // text not null, --
		formacion_nivel: { 
			type: DataTypes.STRING,
			defaultValue: 'TERCER NIVEL' 
		}, // text default 'TERCER NIVEL'::text, -- 
		formacion_titulo: { 
			type: DataTypes.STRING
		}, // text, -- titulo registrado o nombre de especialidad
		formacion_senescyt: { 
			type: DataTypes.STRING
		}, // text, -- registro de SENESCYT/M. EDUCACIÓN
		
		formacion_fingreso: { 
			type: DataTypes.DATE
		}, // date, -- fecha de inicio de estudio
		formacion_fsalida: { 
			type: DataTypes.DATE
		}, // date, -- fehca de culminación de estudios
		formacion_fregistro: { 
			type: DataTypes.DATE
		}, // date, -- FECHA DE REGISTRO EN SENESCYT/M. EDUCACIÓN
		formacion_pdf: { 
			type: DataTypes.STRING
		} // text
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}