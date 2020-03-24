'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.define('tb_atrasos', {
		atraso_id: { 
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
	
		atraso_registro: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // timestamp without time zone default current_timestamp(0),
		atraso_estado: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		}, // text default 'ACTIVO'::text, -- REGISTRO, MODIFICACIÓN
		
		fk_personal_id: { 
			type: DataTypes.INTEGER
		}, // integer not null references tthh.tb_personal(personal_id), -- 
		
		atraso_fecha: { 
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW 
		}, // date, -- 
		atraso_minutos: { 
			type: DataTypes.INTEGER
		}, // int, -- 
		atraso_detalle: { 
			type: DataTypes.STRING,
			defaultValue: 'ACTIVO' 
		} // text -- 
		
	}, {
		schema: 'tthh',
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	
	return Model;
}