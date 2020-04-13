'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_inasistencias', {
		inasistencia_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		inasistencia_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		inasistencia_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'REGISTRO PENDIENTE' 
		}, // text default 'REGISTRO PENDIENTE'::text, -- 
		
		inasistencia_serie: { 
			type: DataTypes.INTEGER
		}, // int default 0, -- 
	
		inasistencia_fecha_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0), -- 
		
		inasistencia_desde: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- 
		inasistencia_hasta: { 
			type: DataTypes.DATE
		}, // timestamp without time zone, -- 
		inasistencia_descripcion: { 
			type: DataTypes.STRING
		}, // text not null, -- 
		
		inasistencia_justificacion_maxima: { 
			type: DataTypes.DATE
		}, // date, -- 3 DIAS DESPUES DE LA FECHA DE FALTA
		inasistencia_fecha_justificacion: { 
			type: DataTypes.DATE
		} // timestamp without time zone, -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}